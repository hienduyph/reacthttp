import { isNull } from "lodash";

import {ResponseType} from "./enums";
import {Headers} from "./headers";
import {ResponseOptionsArgs} from "./interfaces";

export class ResponseOptions {
  // TODO: FormData | Blob
  /**
   * String, Object, ArrayBuffer or Blob representing the body of the {@link Response}.
   */
  body: string|Object|ArrayBuffer|Blob;
  /**
   * Http {@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html status code}
   * associated with the response.
   */
  status: number;
  /**
   * Response {@link Headers headers}
   */
  headers: Headers;
  /**
   * @internal
   */
  statusText: string;
  /**
   * @internal
   */
  type: ResponseType;
  url: string;
  constructor({body, status, headers, statusText, type, url}: ResponseOptionsArgs = {}) {
    this.body = !isNull(body) ? body : null;
    this.status = !isNull(status) ? status : null;
    this.headers = !isNull(headers) ? headers : null;
    this.statusText = !isNull(statusText) ? statusText : null;
    this.type = !isNull(type) ? type : null;
    this.url = !isNull(url) ? url : null;
  }

  merge(options?: ResponseOptionsArgs): ResponseOptions {
    return new ResponseOptions({
      body: !isNull(options) && !isNull(options.body) ? options.body : this.body,
      status: !isNull(options) && !isNull(options.status) ? options.status : this.status,
      headers: !isNull(options) && !isNull(options.headers) ? options.headers : this.headers,
      statusText: !isNull(options) && !isNull(options.statusText) ? options.statusText :
                                                                        this.statusText,
      type: !isNull(options) && !isNull(options.type) ? options.type : this.type,
      url: !isNull(options) && !isNull(options.url) ? options.url : this.url,
    });
  }
}