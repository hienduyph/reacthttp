import { isNull } from "lodash";
import {RequestMethod, ResponseContentType} from "./enums";
import {Headers} from "./headers";
import {normalizeMethodName} from "./http_utils";
import {RequestOptionsArgs} from "./interfaces";
import {URLSearchParams} from "./url_search_params";

export class RequestOptions {
  /**
   * Http method with which to execute a {@link Request}.
   * Acceptable methods are defined in the {@link RequestMethod} enum.
   */
  method: RequestMethod|string;
  /**
   * {@link Headers} to be attached to a {@link Request}.
   */
  headers: Headers;
  /**
   * Body to be used when creating a {@link Request}.
   */
  body: any;
  /**
   * Url with which to perform a {@link Request}.
   */
  url: string;
  /**
   * Search parameters to be included in a {@link Request}.
   */
  search: URLSearchParams;
  /**
   * Enable use credentials for a {@link Request}.
   */
  withCredentials: boolean;
  /*
   * Select a buffer to store the response, such as ArrayBuffer, Blob, Json (or Document)
   */
  responseType: ResponseContentType;

  constructor(
      {method, headers, body, url, search, withCredentials,
       responseType}: RequestOptionsArgs = {}) {
    this.method = !isNull(method) ? normalizeMethodName(method) : null;
    this.headers = !isNull(headers) ? headers : null;
    this.body = !isNull(body) ? body : null;
    this.url = !isNull(url) ? url : null;
    this.search = !isNull(search) ?
        (typeof search === "string" ? new URLSearchParams(<string>(search)) :
                                      <URLSearchParams>(search)) :
        null;
    this.withCredentials = !isNull(withCredentials) ? withCredentials : null;
    this.responseType = !isNull(responseType) ? responseType : null;
  }

  merge(options?: RequestOptionsArgs): RequestOptions {
    return new RequestOptions({
      method: options && !isNull(options.method) ? options.method : this.method,
      headers: options && !isNull(options.headers) ? options.headers : this.headers,
      body: options && !isNull(options.body) ? options.body : this.body,
      url: options && !isNull(options.url) ? options.url : this.url,
      search: options && !isNull(options.search) ?
          (typeof options.search === "string" ? new URLSearchParams(options.search) :
                                                (<URLSearchParams>(options.search)).clone()) :
          this.search,
      withCredentials: options && !isNull(options.withCredentials) ? options.withCredentials :
                                                                       this.withCredentials,
      responseType: options && !isNull(options.responseType) ? options.responseType :
                                                                 this.responseType
    });
  }
}
