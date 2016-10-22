# React Http
---
React http built on top of [fetch](https://github.com/github/fetch) for browser side and [node-fetch](https://github.com/bitinn/node-fetch) for server side.
provides an easy way to interact with backend api.
Include `POST, GET, PATCH, DELETE, PUT` method for REST request, and `sendFiles` method for upload file.

## How to install ?
- With npm: `npm i -S reacthttp`
- With bower: `bower install reacthttp`

## How to use ?
 __ES6 syntax is Recommended way__
 ```js
 import ReactHttp from "reacthttp";

 // Post method
 ReactHttp.get("http://url")
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  })

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

## Examples
See [examples](examples)
