import useSwr from "swr";
import fetcher from "../libs/fetcher";
// import dbConnect from "../utils/db/dbConnect";
const useProducts = async () => {
  const { data, error, isLoading } = useSwr("/api/product", fetcher, {
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

export default useProducts;
