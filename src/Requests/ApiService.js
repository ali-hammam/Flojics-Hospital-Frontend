import { get as getStorage } from '../Libraries/Storage';
export default class ApiService  {
  baseURL;

  constructor() {
    this.baseURL = 'http://127.0.0.1:8000/api'; 
  }

  async requestHandler  (
    url = '', 
    method = 'GET',
    body
  ) {
    const apiData = await fetch(url, this.apiInformation(method, body));
    return this.responseHandler(apiData);
  }

  async responseHandler (apiResponse) {
    const status = apiResponse.status;
    const data = await apiResponse.json();
    return { status, data };
  }

  apiInformation(method = 'GET', body)  {
    const requestInfo = {
      headers: this.authHeader(),
      method,
    };

    if (body) {
      requestInfo['body'] = JSON.stringify(body.data);
    }
    
    return requestInfo;
  }

  authHeader() {
    const requestHeaders  = new Headers();
    const token = getStorage('jwt') || '';
    requestHeaders.set('Authorization', 'Bearer '+ token);
    requestHeaders.set('Cookie', 'Bearer '+ token);
    requestHeaders.set('credentials', 'include');
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Accept', 'application/json');
    return requestHeaders; 
  }

  formatParams (params) {
    if (!params) {
      return '';
    }

    let paramsString = '?';
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        paramsString += `${key}=${value}&`;
      }
    }

    return paramsString;
  }


  post(url = '', body) {
    return this.requestHandler(this.baseURL + url, 'POST', body);
  }
  
  get(url = '', params) {
    const paramsString = this.formatParams(params);
    const currentURL = this.baseURL + url + paramsString;
    console.log(currentURL);
    return this.requestHandler(currentURL, 'GET', undefined);
  }
  
  put(url = '', body) {
    return this.requestHandler(this.baseURL + url, 'PUT', body);
  }
  
  delete(url = '', body) {
    return this.requestHandler(this.baseURL + url, 'DELETE', body);
  }

}
