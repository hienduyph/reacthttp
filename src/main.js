import fetch from "node-fetch";
import FormData from "form-data";
import { BaseHttp } from "./react-http";
import { getHeaders} from "./headers";

export { setHeader } from "./headers";
export * from "./search-params";

const options = {
  header: getHeaders,
  fetch: fetch,
  formData: FormData
};

const Http = BaseHttp(options);
export default Http;
