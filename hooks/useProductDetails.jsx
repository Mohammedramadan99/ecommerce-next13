import { setCategories } from "@/store/categorySlice";
import { setProductDetails } from "@/store/productsSlice";
import BaseUrl from "@/utils/db/BaseUrl";
import { useDispatch } from "react-redux";
import useSwr from "swr";
import fetcherGet from "../libs/fetcherGet";

export function useProductDetails(id) {
  //   console.log({ id });
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSwr(
    `${BaseUrl}/api/product/${id}`,
    fetcherGet,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (error) {
    console.log({ error });
  }
  console.log({ data });
  if (data) {
    dispatch(setProductDetails(data));
  }
  return {
    isLoading,
    data,
    error,
  };
}
