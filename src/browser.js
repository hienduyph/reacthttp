import "whatwg-fetch";
import { BaseHttp } from "./react-http";
import { getHeaders} from "./headers";

export { setHeader } from "./headers";
export * from "./search-params";

const Http = BaseHttp(getHeaders, window.fetch);
if (!window.hasOwnProperty("ReactHttp")) {
  window.ReactHttp = Http;
}
export default Http;
