import "whatwg-fetch";
import { BaseHttp } from "./react-http";
import { getHeaders} from "./headers";

export { setHeader } from "./headers";
export * from "./search-params";

const options = {
  header: getHeaders,
  fetch: window.fetch,
  formData: window.FormData
};

const Http = BaseHttp(options);
if (!window.hasOwnProperty("ReactHttp")) {
  window.ReactHttp = Http;
}
export default Http;
