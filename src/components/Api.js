export default class Api{
  constructor({baseUrl, authorization}) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl + '/cards'}`, {
      headers: {
        authorization: this._authorization,
      }
    })
  }
}