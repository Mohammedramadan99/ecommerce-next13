import { Pagination, Rating, Slider } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MuiBreadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {
  addToCart,
  fetchFilteredProductsAction,
} from "../../store/productsSlice";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import SearchIcon from "@mui/icons-material/Search";
import Spinner from "react-bootstrap/Spinner";
import CloseIcon from "@mui/icons-material/Close";
import { fetchCategoriesAction } from "../../store/categorySlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCategory } from "@/hooks/useCategory";
import { useProducts } from "@/hooks/useProducts";

function Products() {
  const router = useRouter();
  const { category: categoryRoute } = router.query;
  // vars
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryRoute ? categoryRoute : "");
  const [rating, setRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);

  const activeFilter = [
    search !== "" ? { type: "search", payload: search } : "hide",
    category !== "" ? { type: "category", payload: category } : "hide",
    rating !== 0 ? { type: "rating", payload: rating } : "hide",
    minPrice !== ""
      ? {
          type: "minPrice",
          payload: minPrice !== 300 && `less than ${minPrice}`,
        }
      : "hide",
    maxPrice !== ""
      ? { type: "maxPrice", payload: `more than ${maxPrice}` }
      : "hide",
  ];
  const { allProducts, totalItems } = useSelector(
    (state) => state.products.productsList
  );
  const queries = {
    search,
    page,
    limit,
    minPrice,
    maxPrice,
    minRating: rating,
    category,
  };
  useCategory();
  const { isLoading } = useProducts(queries);
  const { categories } = useSelector((state) => state.category);
  // functionnality
  const totalPages = Math.ceil(totalItems / limit);
  console.log({ totalPages });
  const categoryHandler = (c) => {
    setCategory(c);
  };
  const removeActiveFilter = (item) => {
    console.log(item);
    switch (item.type) {
      case "category":
        setCategory("");
        break;
      case "search":
        setSearch("");
        break;
      case "minPrice":
        setMinPrice("");
        break;
      case "maxPrice":
        setMaxPrice("");
        break;
      case "rating":
        setRating(0);
        break;
      default:
        return;
        break;
    }
  };
  const handleChange = (e, p) => {
    setPage(p);
  };
  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="products">
      <div className="products__header">
        <div className="container" data-aos="fade-up">
          <div className="products__header__txt"> all products </div>
          <div className="products__header__breadcrumbs">
            <MuiBreadcrumbs
              items={[
                { title: "home", link: "/" },
                { title: "products", link: "/products" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="products__sidebar" data-aos="fade-right">
          <div className="products__sidebar__header">filter by</div>
          <div className="products__sidebar__filteredProps">
            {activeFilter.length > 0 &&
              activeFilter.map((item, i) => (
                <div
                  key={i}
                  className={`products__sidebar__filteredProps__item ${
                    item === "hide" || item == [0, 300] ? "hide" : ""
                  }`}
                >
                  <div
                    className="products__sidebar__filteredProps__item__del"
                    onClick={() => removeActiveFilter(item)}
                  >
                    <CloseIcon />
                  </div>
                  {item.type === "rating" ? (
                    <Rating
                      value={item?.payload}
                      readOnly
                      precision={0.5}
                      size="small"
                      color=""
                    />
                  ) : (
                    item.payload
                  )}
                </div>
              ))}
          </div>
          {/* Filteration */}
          <div className="products__sidebar__sections">
            {/* C A T E G O R Y */}
            <Accordion>
              <Accordion.Item
                eventKey="0"
                className="products__sidebar__sections__category"
              >
                <Accordion.Header className="products__sidebar__sections__category__title">
                  category
                </Accordion.Header>
                <Accordion.Body className="products__sidebar__sections__category__list">
                  {categories?.map((c, i) => (
                    <div
                      key={i}
                      className="products__sidebar__sections__category__list__item"
                    >
                      <p
                        className={`products__sidebar__sections__category__list__item__txt ${
                          category === c.title ? "active" : ""
                        }`}
                        onClick={() => categoryHandler(c.title)}
                      >
                        {" "}
                        {c.title}{" "}
                      </p>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* P R I C E */}
            <Accordion>
              <Accordion.Item className="products__sidebar__sections__price">
                <Accordion.Header className="products__sidebar__sections__price__title">
                  {" "}
                  price{" "}
                </Accordion.Header>
                <Accordion.Body>
                  <p className="products__sidebar__sections__price__limit">
                    {" "}
                    less than{" "}
                  </p>

                  <Slider
                    value={maxPrice}
                    onChange={(e, price) => {
                      // setMinPrice(price);
                      setMaxPrice(price);
                    }}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={7}
                    max={300}
                  />
                  <p className="products__sidebar__sections__price__limit">
                    {" "}
                    greater than{" "}
                  </p>

                  <Slider
                    value={minPrice}
                    onChange={(e, price) => {
                      setMinPrice(price);
                      // setMaxPrice(price);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={7}
                    max={1000}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* R A T I N G */}
            <Accordion>
              <Accordion.Item className="products__sidebar__sections__rating">
                <Accordion.Header className="products__sidebar__sections__rating__title">
                  rating
                </Accordion.Header>
                <Accordion.Body>
                  <Slider
                    value={rating}
                    onChange={(e, newRating) => {
                      setRating(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <div className="products__right" data-aos="fade-left">
          <div className="products__right__search">
            <input
              type="text"
              placeholder="search ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="products__right__search__icon">
              <SearchIcon />
            </div>
          </div>

          {isLoading ? (
            <div className="spinner">
              <Spinner animation="border" variant="danger" />
            </div>
          ) : allProducts?.length < 1 ? (
            <div className="products__right__items">
              there is no products with that filter
            </div>
          ) : (
            <div className="products__right__items">
              {allProducts?.map((p) => (
                <Link
                  key={p._id}
                  href={`/product/${p._id}`}
                  className="products__right__items__item"
                >
                  <div className="products__right__items__item__img">
                    <Image
                      src={p.images[0]?.url}
                      layout="fill"
                      objectFit="contain"
                      alt="productImage"
                    />
                  </div>
                  <div className="products__right__items__item__info">
                    <div className="products__right__items__item__info__name">
                      {p.name}
                    </div>
                    <div className="products__right__items__item__info__rating">
                      <Rating
                        value={p?.ratings}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                    </div>
                    <div className="products__right__items__item__info__price">
                      ${p.price}
                    </div>
                  </div>
                  <div
                    className="products__right__items__item__addToCart"
                    onClick={() => addToCartHandler(p)}
                  >
                    add to cart
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="products__right__pagination">
            <Pagination
              count={totalPages}
              variant="outlined"
              color="secondary"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
