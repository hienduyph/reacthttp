import {Http} from "../http";
import { RequestOptions } from "../request_options";
import { ResponseOptions } from "../response_options";
import { NodeBackend } from "../backends/node";

const defaultRequestOptions = new RequestOptions();
const responseOptions = new ResponseOptions();
const nodeBackend = new NodeBackend(responseOptions);
const http = new Http(nodeBackend, defaultRequestOptions);

export default http;

export {RequestOptions} from "../request_options";
export {ResponseOptions} from "../response_options";
export {ReadyState, RequestMethod, ResponseContentType, ResponseType} from "../enums";
export {Headers} from "../headers";
export {RequestOptionsArgs, ResponseOptionsArgs} from "../interfaces";
export {Request} from "../static_request";
export {Response} from "../static_response";
export {QueryEncoder, URLSearchParams} from "../url_search_params";