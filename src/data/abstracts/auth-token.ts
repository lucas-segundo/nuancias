export abstract class AbstractAuthToken {
  _authToken = ''

  setAuthToken(token: string) {
    this._authToken = token
  }
}
