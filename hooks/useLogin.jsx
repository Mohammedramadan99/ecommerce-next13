import { setCategories } from "@/store/categorySlice";
import BaseUrl from "@/utils/db/BaseUrl";
import { useDispatch } from "react-redux";
import useSwr from "swr";
import fetcherPost from "../libs/fetcherPost";

export function useLogin(userData) {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSwr(
    `${BaseUrl}/api/auth/login`,
    { body: userData, fetcherPost },
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
    dispatch(setCategories(data));
  }
  return {
    isLoading,
    data,
    error,
  };
}
