import useSwr from "swr";
import fetcher from "../libs/fetcher";

const useCategory = () => {
  const { data, error, isLoading } = useSwr("/api/category", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
  };
};

export default useCategory;
