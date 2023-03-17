import axios from "axios";

const fetcherPost = (url) => axios.post(url).then((res) => res.data);

export default fetcherPost;
