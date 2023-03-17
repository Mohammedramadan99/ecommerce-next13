import axios from "axios";

const fetcherGet = (url) => axios.get(url).then((res) => res.data);

export default fetcherGet;
