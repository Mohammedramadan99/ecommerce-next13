import { setCategories } from "@/store/categorySlice";
import BaseUrl from "@/utils/db/BaseUrl";
import { useDispatch } from "react-redux";
import useSwr from "swr";
import fetcherGet from "../libs/fetcherGet";

const useCategory = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSwr(
    `${BaseUrl}/api/category`,
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
    dispatch(setCategories(data));
  }
};

export default useCategory;
