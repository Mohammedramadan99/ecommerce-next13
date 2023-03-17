import { setCategories } from "@/store/categorySlice";
import BaseUrl from "@/utils/db/BaseUrl";
import { useDispatch } from "react-redux";
import useSwr from "swr";
import fetcherPost from "../libs/fetcherPost";

const useCategory = ({ queries }) => {
  const dispatch = useDispatch();
  const allData = {
    search: queries.keyword ? queries.keyword : "",
    page: queries.currentPage ? queries.currentPage : 1,
    limit: queries.limit ? queries.limit : 9,
    minPrice: queries.minPrice ? queries.minPrice : 300,
    maxPrice: queries.maxPrice ? queries.maxPrice : 0,
    minRating: queries.minRating ? queries.minRating : 0,
    category: queries.category ? queries.category.toLowerCase() : null,
  };
  const { search, page, maxPrice, minPrice, minRating, category } = allData;
  // ?&minRating[gte]=${minRating}

  link = `api/product?search=${search}&minRating=${ratings}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`;
  const { data, error, isLoading } = useSwr(`${BaseUrl}/${link}`, fetcherPost, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (error) {
    console.log({ error });
  }
  console.log({ data });
  if (data) {
    dispatch(setCategories(data));
  }
};

export default useCategory;
