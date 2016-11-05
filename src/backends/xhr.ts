import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import { isNull } from "lodash";
import * as cookie from "js-cookie";

import {ResponseOptions} from "../response_options";
import {ContentType, ReadyState, RequestMethod, ResponseContentType, ResponseType} from "../enums";
import {Headers} from "../headers";
import {getResponseURL, isSuccess} from "../http_utils";
import {Connection, ConnectionBackend, XSRFStrategy} from "../interfaces";
import {Request} from "../static_request";
import {Response} from "../static_response";


const XSSI_PREFIX = /^\)\]\}",?\n/;

export class BrowserXhr {
  constructor() {/** */}
  public build(): any { return <any>(new XMLHttpRequest()); }
}

/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 */
export class XHRConnection implements Connection {
  request: Request;
  /**
   * Response {@link EventEmitter} which emits a single {@link Response} value on load event of
   * `XMLHttpRequest`.
   */
  response: Observable<Response>;
  readyState: ReadyState;
  constructor(req: Request, browserXHR: BrowserXhr, baseResponseOptions?: ResponseOptions) {
    this.request = req;
    this.response = new Observable<Response>((responseObserver: Observer<Response>) => {
      let _xhr: XMLHttpRequest = browserXHR.build();
      _xhr.open(RequestMethod[req.method].toUpperCase(), req.url);
      if (!isNull(req.withCredentials)) {
        _xhr.withCredentials = req.withCredentials;
      }
      // load event handler
      let onLoad = () => {
        // responseText is the old-school way of retrieving response (supported by IE8 & 9)
        // response/responseType properties were introduced in ResourceLoader Level2 spec (supported
        // by IE10)
        let body = _xhr.response === undefined ? _xhr.responseText : _xhr.response;
        // Implicitly strip a potential XSSI prefix.
        if (typeof body === "string") {body = body.replace(XSSI_PREFIX, "")};
        let headers = Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());

        let url = getResponseURL(_xhr);

        // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
        let status: number = _xhr.status === 1223 ? 204 : _xhr.status;

        // fix status code when it is 0 (0 status is undocumented).
        // Occurs when accessing file resources or on Android 4.1 stock browser
        // while retrieving files from application cache.
        if (status === 0) {
          status = body ? 200 : 0;
        }

        let statusText = _xhr.statusText || "OK";

        let responseOptions = new ResponseOptions({body, status, headers, statusText, url});
        if (!isNull(baseResponseOptions)) {
          responseOptions = baseResponseOptions.merge(responseOptions);
        }
        let response = new Response(responseOptions);
        response.ok = isSuccess(status);
        if (response.ok) {
          responseObserver.next(response);
          // TODO(gdi2290): defer complete if array buffer until done
          responseObserver.complete();
          return;
        }
        responseObserver.error(response);
      };
      // error event handler
      let onError = (err: any) => {
        let responseOptions = new ResponseOptions({
          body: err,
          status: _xhr.status,
          statusText: _xhr.statusText,
          type: ResponseType.Error,
        });
        if (!isNull(baseResponseOptions)) {
          responseOptions = baseResponseOptions.merge(responseOptions);
        }
        responseObserver.error(new Response(responseOptions));
      };

      this.setDetectedContentType(req, _xhr);

      if (!isNull(req.headers)) {
        req.headers.forEach((values, name) => _xhr.setRequestHeader(name, values.join(",")));
      }

      // Select the correct buffer type to store the response
      if (!isNull(req.responseType) && !isNull(_xhr.responseType)) {
        switch (req.responseType) {
          case ResponseContentType.ArrayBuffer:
            _xhr.responseType = "arraybuffer";
            break;
          case ResponseContentType.Json:
            _xhr.responseType = "json";
            break;
          case ResponseContentType.Text:
            _xhr.responseType = "text";
            break;
          case ResponseContentType.Blob:
            _xhr.responseType = "blob";
            break;
          default:
            throw new Error("The selected responseType is not supported");
        }
      }

      _xhr.addEventListener("load", onLoad);
      _xhr.addEventListener("error", onError);

      _xhr.send(this.request.getBody());

      return () => {
        _xhr.removeEventListener("load", onLoad);
        _xhr.removeEventListener("error", onError);
        _xhr.abort();
      };
    });
  }

  public setDetectedContentType(req: any /** TODO #9100 */, _xhr: any /** TODO #9100 */) {
    // Skip if a custom Content-Type header is provided
    if (!isNull(req.headers) && !isNull(req.headers.get("Content-Type"))) {
      return;
    }

    // Set the detected content type
    switch (req.contentType) {
      case ContentType.NONE:
        break;
      case ContentType.JSON:
        _xhr.setRequestHeader("content-type", "application/json");
        break;
      case ContentType.FORM:
        _xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        break;
      case ContentType.TEXT:
        _xhr.setRequestHeader("content-type", "text/plain");
        break;
      case ContentType.BLOB:
        const blob = req.blob();
        if (blob.type) {
          _xhr.setRequestHeader("content-type", blob.type);
        }
        break;

      default:
        break;
    }
  }
}

export class CookieXSRFStrategy implements XSRFStrategy {
  constructor(
      private _cookieName: string = "XSRF-TOKEN", private _headerName: string = "X-XSRF-TOKEN") {}

  configureRequest(req: Request) {
    let xsrfToken = cookie.get(this._cookieName);
    if (xsrfToken) {
      req.headers.set(this._headerName, xsrfToken);
    }
  }
}

export class XHRBackend implements ConnectionBackend {
  constructor(
      private _browserXHR: BrowserXhr, private _baseResponseOptions: ResponseOptions,
      private _xsrfStrategy: XSRFStrategy) {}

  createConnection(request: Request): XHRConnection {
    this._xsrfStrategy.configureRequest(request);
    return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
  }
}