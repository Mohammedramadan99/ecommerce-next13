import axios from "axios";

const fetcherPost = (url, params) =>
  axios.post(url, params).then((res) => res.data);
export default fetcherPost;
