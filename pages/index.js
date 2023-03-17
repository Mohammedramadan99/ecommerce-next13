import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../store/productsSlice";
import dynamic from "next/dynamic";
import { Spinner } from "react-bootstrap";
import { fetchCategoriesAction } from "../store/categorySlice";
import { fetchGlobalReviewsAction } from "../store/reviewUsSlice";
import { wrapper } from "@/store/store";
import useSwr from "swr";
import fetcher from "@/libs/fetcherGet";
import { useCategory } from "@/hooks/useCategory";
// import useProducts from "../hooks/useProducts";
const Banner = dynamic(() => import("../components/Banner/Banner"), {
  ssr: false,
});
const AllCategories = dynamic(
  () => import("../components/Categories/AllCategories"),
  {
    ssr: false,
  }
);
const Categories = dynamic(
  () => import("../components/Categories/Categories"),
  {
    ssr: false,
  }
);
const CustomerSays = dynamic(
  () => import("../components/CustomerSays/CustomerSays"),
  {
    ssr: false,
  }
);
const Features = dynamic(() => import("../components/Features/Features"), {
  ssr: false,
});
const ProductsSlider = dynamic(
  () => import("../components/Products/ProductsSlider"),
  {
    ssr: false,
  }
);
const SpecialOffer = dynamic(
  () => import("../components/SpecialOffer/SpecialOffer"),
  {
    ssr: false,
  }
);

export default function Home() {
  const dispatch = useDispatch();

  // fetch categories
  // categories
  const { isLoading: categoryLoading } = useCategory();
  // get website reviews
  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: reviewsLoading,
  } = useSwr(
    "https://ecommerce-backend-k2u7pzka2-mohammedramadan99.vercel.app/api/review/us",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // const { loading: reviewusLoading } = useSelector(
  //   (state) => state.globalReviews
  // );
  // const loading = productsLoading || categoryLoading ? true : false
  // useEffect(() => {
  //   dispatch(fetchProductsAction());
  // }, [dispatch]);
  return (
    <div>
      <AllCategories isLoading={categoryLoading} />
      <Banner />
      <Categories isLoading={categoryLoading} />
      <ProductsSlider />
      <SpecialOffer />
      <CustomerSays reviews={reviewsData?.reviews} />
      <Features />
      {/* {reviewsLoading ? (
        <div
          className="spinner"
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          <AllCategories categories={data?.categories} />
          <Banner />
          <Categories categories={data?.categories} />
          <ProductsSlider />
          <SpecialOffer />
          <CustomerSays reviews={reviewsData?.reviews} />
          <Features />
        </>
      )} */}
    </div>
  );
}
