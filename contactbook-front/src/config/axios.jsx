import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = baseUrl;
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default axios;