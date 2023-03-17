import { setProducts } from "@/store/productsSlice";
import BaseUrl from "@/utils/db/BaseUrl";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import fetcherGet from "../libs/fetcherGet";
export function useProducts(queries) {
  const dispatch = useDispatch();
  console.log(queries);
  const allData = {
    search: queries?.search ? queries?.search : "",
    page: queries?.page ? queries?.page : 1,
    limit: queries?.limit ? queries?.limit : 9,
    minPrice: queries?.minPrice ? queries?.minPrice : "",
    maxPrice: queries?.maxPrice ? queries?.maxPrice : "",
    minRating: queries?.minRating ? queries?.minRating : 0,
    category: queries?.category ? queries?.category.toLowerCase() : "",
  };
  const { search, page, maxPrice, minPrice, minRating, category, limit } =
    allData;

  const link = `api/product?search=${search}&cat=${category}&minRating=${minRating}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`;
  const { data, error, isLoading } = useSWR(`${BaseUrl}/${link}`, fetcherGet, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (data) {
    dispatch(setProducts(data));
  }
  return {
    data: data,
    error,
    isLoading: isLoading,
  };
}

// export default useProducts;
