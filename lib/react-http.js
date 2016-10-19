/*
 * Http module work both client and server side using fetch
 * Http has 5 basic method post, get, put, patch and delete
 * By default, Content-Type is application/json
 */

import fetch from "isomorphic-fetch";
import { getHeaders } from "./headers";

const BaseHttp = (header) => {
  let httpMethod = {};
  //Get method
  httpMethod.get = (url) => {
    return fetch(url, {
        headers: header()
      })
      .then(extraData)
      .catch(handleError);
  };

  //Post method
  httpMethod.post = (url, body, options) => {
    let data = JSON.stringify(body);
    return fetch(url, {
        method: "POST",
        headers: header(),
        body: data
      })
      .then(extraData)
      .catch(handleError);
  };

  httpMethod.put = (url, body, options) => {
    let data = JSON.stringify(body);

    return fetch(url, {
        method: "PUT",
        headers: header(),
        body: data
      })
      .then(extraData)
      .catch(handleError);
  };

  httpMethod.patch = (url, body, options) => {
    let data = JSON.stringify(body);
    return fetch(url, {
        method: "PATCH",
        headers: header(),
        body: data
      })
      .then(extraData)
      .catch(handleError);
  };

  httpMethod.delete = (url, options) => {
    return fetch(url, {
        method: "DELETE",
        headers: header()
      })
      .catch(handleError);
  };

  const extraData = response => {
    if (response.status < 200 || response.status >= 300) {
      let error  = new Error();
      error.message = response.json();
      throw error;
    }

    return response.json() || {};
  };

  const handleError = (error) => {
    throw error.message || "Server error";
  };
  
  return httpMethod;
};

export const Http = BaseHttp(getHeaders);