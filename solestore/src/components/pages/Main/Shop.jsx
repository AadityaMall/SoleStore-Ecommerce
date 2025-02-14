import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Pagination, Slider } from "@mui/material";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import Loader from "./Loader";
import ProductBox from "../../layout/ProductBox";

const Shop = ({ mode }) => {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [ratings, setRatings] = useState(0);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const homeFilter = location.state?.homeFilter || "";

  const { loading, error, products, resultPerPage, productsCount, filteredProductsCount } = 
    useSelector((state) => state.products);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarFixed(window.pageYOffset >= 200);
    };

    window.addEventListener("scroll", handleScroll);
    window.scrollTo(0, 0);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    try {
      if(homeFilter){
        setCategory(homeFilter);
      }
      dispatch(getProduct(currentPage, [0, 30000], homeFilter, 0));
    } catch (err) {
      console.error("Error loading products:", err);
      toast.error("Failed to load products. Please try again.");
    }
  }, [dispatch, error, homeFilter, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setLoadingTimeout(true);
        toast.error("Loading took too long. Please refresh the page.");
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timer);
  }, [loading]);

  const applyFilters = () => {
    dispatch(getProduct(currentPage, price, category, ratings, sort));
  };

  const shopBanner = () => {
    return window.innerWidth < 500 
      ? "./images/shopWithUs_phone_bg.png" 
      : "./images/shopWithUs_bg.png";
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
    dispatch(getProduct(page, price, category, ratings, sort));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div data-theme={mode}>
          <img src={shopBanner()} alt="Shop Banner" className="tw:w-full" />
          
          <div className="tw:text-center tw:mt-4 tw:dark:text-white">
            <h1 className="tw:font-brand">Products</h1>
            <hr className="tw:w-[70%] tw:mx-auto" />
          </div>

          <nav className={`tw:bg-white tw:dark:bg-[#212529] tw:border-t tw:dark:border-white tw:border-black
            ${isNavbarFixed ? "tw:fixed tw:top-[60px]" : "tw:relative"} 
            tw:w-full tw:z-50 tw:transition-all tw:duration-300`}>
            
            <div className="tw:container tw:mx-auto tw:py-4">
              {/* Mobile Toggle Button */}
              <button
                className="tw:md:hidden tw:w-full tw:py-2 tw:px-4 tw:mb-4 tw:text-left tw:dark:text-white"
                onClick={() => document.getElementById('filterMenu').classList.toggle('tw:hidden')}
              >
                Filters
              </button>

              {/* Filter Menu - Collapsible on Mobile */}
              <div id="filterMenu" className="tw:hidden tw:md:block tw:md:px-0 px-5">
                <div className="tw:flex tw:flex-col tw:md:flex-row tw:justify-evenly tw:items-center tw:gap-4">
                  {/* Price Range Slider */}
                  <div className="tw:w-full tw:md:w-[20%] tw:mb-4 tw:md:mb-0">
                    <span className="tw:block tw:mb-2 tw:dark:text-white">Price Range:</span>
                    <Slider
                      value={price}
                      onChange={(e, newPrice) => setPrice(newPrice)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30000}
                      color="secondary"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="tw:w-full tw:md:w-[15%] tw:p-2 tw:mb-4 tw:md:mb-0 tw:rounded tw:bg-white tw:border 
                      tw:border-black tw:text-black"
                  >
                    <option value="">Filter: Category</option>
                    <option value="Sneakers">Sneakers</option>
                    <option value="Formals">Formals</option>
                    <option value="Sports">Sports</option>
                  </select>

                  {/* Sort Filter */}
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="tw:w-full tw:md:w-[15%] tw:p-2 tw:mb-4 tw:md:mb-0 tw:rounded tw:bg-white tw:border 
                      tw:border-black tw:text-black"
                  >
                    <option value="">Sort: Price Range</option>
                    <option value="price">Low to High</option>
                    <option value="-price">High to Low</option>
                  </select>

                  {/* Ratings Slider */}
                  <div className="tw:w-full tw:md:w-[20%] tw:mb-4 tw:md:mb-0">
                    <span className="tw:block tw:mb-2 tw:dark:text-white">Rating:</span>
                    <Slider
                      value={ratings}
                      onChange={(e, newRating) => setRatings(newRating)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={5}
                      color="secondary"
                    />
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={applyFilters}
                    className="tw:w-full tw:md:w-auto tw:px-6 tw:py-2 tw:bg-black tw:text-white tw:dark:bg-white 
                      tw:dark:text-black tw:rounded tw:hover:opacity-80 tw:transition-opacity"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Products Grid */}
          <div className="tw:flex tw:flex-wrap tw:justify-center tw:gap-6 tw:mt-8">
            {products?.map((product) => (
              <ProductBox key={product._id} product={product} mode={mode} />
            ))}
          </div>

          {/* Pagination */}
          {resultPerPage < filteredProductsCount && (
            <div className="tw:flex tw:justify-center tw:my-8">
              <Pagination
                count={Math.ceil(productsCount / resultPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="secondary"
                className="tw:dark:text-white"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: mode === 'dark' ? '#fff' : '#000',
                  },
                  '& .MuiPaginationItem-page.Mui-selected': {
                    backgroundColor: mode === 'dark' ? '#fff' : '#000',
                    color: mode === 'dark' ? '#000' : '#fff',
                  },
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Shop;
