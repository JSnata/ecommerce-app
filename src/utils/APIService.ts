import axios from 'axios';

class APIService {
  static headers = {
    Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
  };

  static createUrl(endpoint: string): string {
    if (!process.env.REACT_APP_API_URL || !process.env.REACT_APP_API_PROJECT_KEY) {
      throw new Error('API_HOST or API_KEY environment variables are not defined');
    }
    return `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PROJECT_KEY}/${endpoint}`;
  }

  static async getData(endpoint: string) {
    const url = APIService.createUrl(endpoint);
    try {
      const response = await axios.get(`${url}`, { headers: this.headers });
      console.log(response);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export default APIService;
