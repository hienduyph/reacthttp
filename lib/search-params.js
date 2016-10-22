//
export class UrlSearchParams {
  constructor() {
    this.urlObj = {};
  }

  append(key, value) {
    this.urlObj[key] = value;
  }

  getUrl() {
    let url = "";
    for (let key in this.urlObj) {
      url += `${key}=${this.urlObj[key]}&`;
    }
    return url;
  }
}