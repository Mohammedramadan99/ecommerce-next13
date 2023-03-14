import useSwr from "swr";
import fetcher from "../libs/fetcher";
// import dbConnect from "../utils/db/dbConnect";
const useProducts = async () => {
  const { data, error, isLoading } = useSwr(
    "https://ecommerce-backend-5zcumxly0-mohammedramadan99.vercel.app/api/product",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
  };
};

export default useProducts;
