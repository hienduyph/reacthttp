import fetch from "node-fetch";
import { BaseHttp } from "./react-http";
import { getHeaders} from "./headers";

export { setHeader } from "./headers";
export * from "./search-params";

const Http = BaseHttp(getHeaders, fetch);
export default Http;
