# React Http [![Build Status](https://img.shields.io/travis/tinpee/reacthttp/master.svg?style=flat-square)](https://travis-ci.org/tinpee/reacthttp) [![Coverage Status](https://img.shields.io/coveralls/tinpee/reacthttp/master.svg?style=flat-square)](https://coveralls.io/github/tinpee/reacthttp?branch=master) [![npm version](https://img.shields.io/npm/v/reacthttp.svg?style=flat-square)](https://www.npmjs.com/package/reacthttp) [![bower version](https://img.shields.io/bower/v/reacthttp.svg?style=flat-square)](https://www.npmjs.com/package/reacthttp)


React Http is built on top of [fetch](https://github.com/github/fetch) for browser side and [node-fetch](https://github.com/bitinn/node-fetch) for server side.
It provides an lightweight and fancy way to interact with backend REST API.

ReactHttp provides 5 basic method of REST API: `POST, GET, PATCH, DELETE, PUT` and new medthod `sendFiles` for upload file.

## Installation
- With npm: `npm install reacthttp`
- With bower: `bower install reacthttp`
- cdnjs: ""
## Usage
### Basic usage
 ```js
 import ReactHttp from "reacthttp";

 // Get method
 ReactHttp.get("http://url")
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  })
// Post method
ReactHttp.post("http://url", {foo: "bar"})
 .then(data => {
   console.log(data);
 })
 .catch(error => {
   console.log(error);
 })

// Upload file
var input = document.querySelector('input[type="file"]')
ReactHttp.sendFiles("http://url", {file: input.files[0]})
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  })
```
### With URL Search Params
UrlSearchParams supports all method of `ReactHttp`
```js
import ReactHttp, { UrlSearchParams } from "reacthttp";
let searchParams = new UrlSearchParams();
searchParams.append("page", 1);
searchParams.append("order_by", "title")
// Send request
ReactHttp.get("http://url", searchParams)
    .then()
```

### Custome Header
By default, ReactHttp's header
```js
let defaultHeaderOptions = {  
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
```
You can add or modify __global headers__ by `setHeader` function
```js
import ReactHttp, { setHeader } from "reacthttp";
// custom header, if you want to override default header, just add it.
const customHeader = {
    Authorization: "Bearer askjdhui2343asdfjkhadsf",
    // Want to override
    Content-Type: ...
};
// change global header
setHeader(customHeader);
// Now ReactHttp will use new custom header
```

Modify header for only one request
```js
import ReactHttp from "reacthttp";
const headerOptions = {
    Authorization: "Bearer askjdhui2343asdfjkhadsf",
};
ReactHttp.get("http://url", null, headerOptions)
    .then()
```

## API
```js
import ReactHttp, { setHeader, UrlSearchParams } from "reacthttp";

ReactHttp.get(url, urlSearchParams, customHeader);
ReactHttp.post(url, body, urlSearchParams, customHeader);
ReactHttp.put(url, body, urlSearchParams, customHeader);
ReactHttp.patch(url, body, urlSearchParams, customHeader);
ReactHttp.delete(url, urlSearchParams, customHeader);
// Default sendfiles Content-Type is `multipart/form-data`
ReactHttp.sendFiles(url, fileObj, urlSearchParams, customHeader);

// urlSearchParams is an instance of UrlSearchParams class
// customHeader is an js object with key is a Http Header Field.
```
## Examples
See [examples](examples)

## Liscense
[MIT](https://opensource.org/licenses/mit-license.php)
