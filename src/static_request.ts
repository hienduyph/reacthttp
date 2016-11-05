import { isNull } from "lodash";

import {Body} from "./body";
import {ContentType, RequestMethod, ResponseContentType} from "./enums";
import {Headers} from "./headers";
import {normalizeMethodName} from "./http_utils";
import {RequestArgs} from "./interfaces";
import {URLSearchParams} from "./url_search_params";

export class Request extends Body {
  /**
   * Http method with which to perform the request.
   */
  method: RequestMethod;
  /**
   * {@link Headers} instance
   */
  headers: Headers;
  /** Url of the remote resource */
  url: string;
  /** Type of the request body **/
  private contentType: ContentType;
  /** Enable use credentials */
  withCredentials: boolean;
  /** Buffer to store the response */
  responseType: ResponseContentType;
  constructor(requestOptions: RequestArgs) {
    super();
    // TODO: assert that url is present
    let url = requestOptions.url;
    this.url = requestOptions.url;
    if (isNull(requestOptions.search)) {
      let search = requestOptions.search.toString();
      if (search.length > 0) {
        let prefix = "?";
        if (this.url.indexOf("?") !== -1) {
          prefix = (this.url[this.url.length - 1] === "&") ? "" : "&";
        }
        // TODO: just delete search-query-looking string in url?
        this.url = url + prefix + search;
      }
    }
    this._body = requestOptions.body;
    this.method = normalizeMethodName(requestOptions.method);
    // TODO(jeffbcross): implement behavior
    // Defaults to "omit", consistent with browser
    // TODO(jeffbcross): implement behavior
    this.headers = new Headers(requestOptions.headers);
    this.contentType = this.detectContentType();
    this.withCredentials = requestOptions.withCredentials;
    this.responseType = requestOptions.responseType;
  }

  /**
   * Returns the content type enum based on header options.
   */
  detectContentType(): ContentType {
    switch (this.headers.get("content-type")) {
      case "application/json":
        return ContentType.JSON;
      case "application/x-www-form-urlencoded":
        return ContentType.FORM;
      case "multipart/form-data":
        return ContentType.FORM_DATA;
      case "text/plain":
      case "text/html":
        return ContentType.TEXT;
      case "application/octet-stream":
        return ContentType.BLOB;
      default:
        return this.detectContentTypeFromBody();
    }
  }

  /**
   * Returns the content type of request"s body based on its type.
   */
  detectContentTypeFromBody(): ContentType {
    if (this._body == null) {
      return ContentType.NONE;
    } else if (this._body instanceof URLSearchParams) {
      return ContentType.FORM;
    } else if (this._body instanceof FormData) {
      return ContentType.FORM_DATA;
    } else if (this._body instanceof Blob) {
      return ContentType.BLOB;
    } else if (this._body instanceof ArrayBuffer) {
      return ContentType.ARRAY_BUFFER;
    } else if (this._body && typeof this._body == "object") {
      return ContentType.JSON;
    } else {
      return ContentType.TEXT;
    }
  }

  /**
   * Returns the request"s body according to its type. If body is undefined, return
   * null.
   */
  getBody(): any {
    switch (this.contentType) {
      case ContentType.JSON:
        return this.text();
      case ContentType.FORM:
        return this.text();
      case ContentType.FORM_DATA:
        return this._body;
      case ContentType.TEXT:
        return this.text();
      case ContentType.BLOB:
        return this.blob();
      case ContentType.ARRAY_BUFFER:
        return this.arrayBuffer();
      default:
        return null;
    }
  }
}

const noop = function() {};
const w = typeof window === "object" ? window : noop;
const FormData = (w as any /** TODO #9100 */)["FormData"] || noop;
const Blob = (w as any /** TODO #9100 */)["Blob"] || noop;
const ArrayBuffer = (w as any /** TODO #9100 */)["ArrayBuffer"] || noop;
