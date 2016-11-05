import { isNull } from "lodash";
import { Observable } from "rxjs/Observable";
import {RequestOptions} from "./request_options";
import {RequestMethod} from "./enums";
import {ConnectionBackend, RequestOptionsArgs} from "./interfaces";
import {Request} from "./static_request";
import {Response} from "./static_response";

function httpRequest(backend: ConnectionBackend, request: Request): Observable<Response> {
  return backend.createConnection(request).response;
}

function mergeOptions(
    defaultOpts: RequestOptions, providedOpts: RequestOptionsArgs, method: RequestMethod,
    url: string): RequestOptions {
  const newOptions = defaultOpts;
  if (isNull(providedOpts)) {
    // Hack so Dart can used named parameters
    return newOptions.merge(new RequestOptions({
      method: providedOpts.method || method,
      url: providedOpts.url || url,
      search: providedOpts.search,
      headers: providedOpts.headers,
      body: providedOpts.body,
      withCredentials: providedOpts.withCredentials,
      responseType: providedOpts.responseType
    }));
  }
  if (isNull(method)) {
    return newOptions.merge(new RequestOptions({method: method, url: url}));
  } else {
    return newOptions.merge(new RequestOptions({url: url}));
  }
}

export class Http {
  constructor(protected _backend: ConnectionBackend, protected _defaultOptions: RequestOptions) {}

  /**
   * Performs any type of http request. First argument is required, and can either be a url or
   * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
   * object can be provided as the 2nd argument. The options object will be merged with the values
   * of {@link RequestOptions} before performing the request.
   */
  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let responseObservable: any;
    if (typeof url === "string") {
      responseObservable = httpRequest(
          this._backend,
          new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, <string>url)));
    } else if (url instanceof Request) {
      responseObservable = httpRequest(this._backend, url);
    } else {
      throw new Error("First argument must be a url string or Request instance.");
    }
    return responseObservable;
  }

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(
        new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
  }

  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(new Request(mergeOptions(
        this._defaultOptions.merge(new RequestOptions({body: body})), options, RequestMethod.Post,
        url)));
  }

  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(new Request(mergeOptions(
        this._defaultOptions.merge(new RequestOptions({body: body})), options, RequestMethod.Put,
        url)));
  }

  /**
   * Performs a request with `delete` http method.
   */
  delete (url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(
        new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Delete, url)));
  }

  /**
   * Performs a request with `patch` http method.
   */
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(new Request(mergeOptions(
        this._defaultOptions.merge(new RequestOptions({body: body})), options, RequestMethod.Patch,
        url)));
  }

  /**
   * Performs a request with `head` http method.
   */
  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(
        new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Head, url)));
  }

  /**
   * Performs a request with `options` http method.
   */
  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(
        new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Options, url)));
  }
}
