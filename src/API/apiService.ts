import axios from 'axios';

class ApiService {
  // TODO: needed to switch token to user token
  static headers = {
    Authorization: `Bearer ${process.env}`,
  };

  static createUrl(endpoint: string): string {
    if (!process.env.REACT_APP_CTP_AUTH_URL || !process.env.REACT_APP_CTP_PROJECT_KEY) {
      throw new Error('API_HOST or API_KEY environment variables are not defined');
    }
    return `${process.env.REACT_APP_CTP_AUTH_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/${endpoint}`;
  }

  static async getData(endpoint: string) {
    const url = ApiService.createUrl(endpoint);
    try {
      const response = await axios.get(`${url}`, { headers: this.headers });
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export default ApiService;
