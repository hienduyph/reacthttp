/*
 * Http module work both client and server side using fetch
 * Http has 5 basic method post, get, put, patch and delete
 * By default, Content-Type is application/json
 * Upload file with Content-Type: multipart/form-data
 */
import { UrlSearchParams } from "./search-params";

export const BaseHttp = ({header, fetch, formData}) => {
  let httpMethod = {};

  //Get method
  httpMethod.get = (url, searchParams, headerOptions) => {
    if (searchParams instanceof UrlSearchParams) {
      url += `?${searchParams.getUrl()}`;
    }
    return fetch(url, {
        headers: Object.assign({}, header(), headerOptions)
      })
      .then(extraData)
      .catch(handleError);
  };

  //Post method
  httpMethod.post = (url, body, searchParams, headerOptions) => {
    if (searchParams instanceof UrlSearchParams) {
      url += `?${searchParams.getUrl()}`;
    }

    return fetch(url, {
        method: "POST",
        headers: Object.assign({}, header(), headerOptions),
        body: JSON.stringify(body)
      })
      .then(extraData)
      .catch(handleError);
  };

  // Put method
  httpMethod.put = (url, body, searchParams,  headerOptions) => {
    if (searchParams instanceof UrlSearchParams) {
      url += `?${searchParams.getUrl()}`;
    }

    return fetch(url, {
        method: "PUT",
        headers: Object.assign({}, header(), headerOptions),
        body: JSON.stringify(body)
      })
      .then(extraData)
      .catch(handleError);
  };

  // Patch method
  httpMethod.patch = (url, body, searchParams, headerOptions) => {
    if (searchParams instanceof UrlSearchParams) {
      url += `?${searchParams.getUrl()}`;
    }

    return fetch(url, {
        method: "PATCH",
        headers: Object.assign({}, header(), headerOptions),
        body: JSON.stringify(body)
      })
      .then(extraData)
      .catch(handleError);
  };

  // Delete method
  httpMethod.delete = (url, searchParams, headerOptions) => {
    if (searchParams instanceof UrlSearchParams) {
      url += `?${searchParams.getUrl()}`;
    }

    return fetch(url, {
        method: "DELETE",
        headers: Object.assign({}, header(), headerOptions)
      })
      .then(extraData)
      .catch(handleError);
  };

  // Post file
  // fileObj is an object
  // Example: fileObjs = { file1: input.files[0] }
  httpMethod.sendFiles = (url, fileObjs, searchParams, headerOptions) => {
    const header = Object.assign({}, {"Content-Type": "multipart/form-data"}, headerOptions);
    if (searchParams instanceof UrlSearchParams) {
      url += `?${searchParams.getUrl()}`;
    }
    // Formdata
    let data = new formData();
    for (let key in fileObjs) {
      data.append(key, fileObjs[key])
    };

    return fetch(url, {
        method: "POST",
        body: data,
        header: header
      })
      .then(extraData)
      .catch(handleError);
  };

  // Extra data json
  const extraData = response => {
    if (response.status < 200 || response.status >= 300) {
      let error  = new Error();
      error.message = response.json();
      throw error;
    }

    return response.json() || {};
  };

  // handler error
  const handleError = (error) => {
    throw error.message || "Server error";
  };

  return httpMethod;
};
