import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from "../../redux/actions/productAction";
import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import {
  AccountTree,
  Description,
  ProductionQuantityLimits,
  Spellcheck,
  CurrencyRupee,
} from "@mui/icons-material";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstants";
const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateproduct);

  const { error, product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    console.log(images);
    console.log(Stock);
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(id, myForm));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Created Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, id, product, updateError]);

  return (
    <>
<div className="row">
          <h1 className="tw:font-brand tw:font-bold text-center">Update Product</h1>
          <div className="tw:w-full tw:flex tw:justify-center">
            <form
              className="tw:max-w-[50%] tw:mt-3"
              encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
            >
              <div className="form-group mb-4 tw:relative">
                <Spellcheck className="tw:absolute tw:left-[5px] tw:top-[8px]"/>
                <input
                  type="text"
                  className="form-control tw:py-2 tw:pl-[40px]"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mb-4 tw:relative">
                <CurrencyRupee className="tw:absolute tw:left-[5px] tw:top-[8px]" />
                <input
                  type="Number"
                  className="form-control tw:py-2 tw:pl-[40px]"
                  placeholder="Price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group mb-4 tw:relative">
                <Description className="tw:absolute tw:left-[5px] tw:top-[8px]" />
                <textarea
                  className="form-control tw:py-2 tw:pl-[40px]"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group mb-4 tw:relative">
                <AccountTree className="tw:absolute tw:left-[5px] tw:top-[8px]"/>
                <select
                  className="form-control tw:py-2 tw:pl-[40px]"
                  id="selectInput-Admin"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  <option value="Sports">Sports</option>
                  <option value="Sneakers">Sneakers</option>
                  <option value="Formals">Formals</option>
                </select>
              </div>
              <div className="form-group mb-4 tw:relative">
                <ProductionQuantityLimits className="tw:absolute tw:left-[5px] tw:top-[8px]"/>
                <input
                  type="Number"
                  className="form-control tw:py-2 tw:pl-[40px]"
                  placeholder="Stock"
                  name="Stock"
                  value={Stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="form-group mb-4 tw:relative image-input">
                <input
                  type="file"
                  className="form-control productImageInput"
                  name="avatar"
                  accept="image/*"
                  multiple
                  onChange={updateProductImagesChange}
                  required
                />
              </div>
              <div className="tw:md:w-[350px] tw:w-[300px] tw:flex tw:overflow-x-auto tw:my-4 tw:justify-evenly">
                {oldImages && oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" className="tw:max-w-[150px] tw:w-[150px] tw:aspect-square tw:px-2"/>
                ))}
              </div>
              <div className="tw:md:w-[350px] tw:w-[300px] tw:flex tw:overflow-x-auto tw:my-4 tw:justify-evenly">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" className="tw:max-w-[150px] tw:w-[150px] tw:aspect-square tw:px-2"/>
                ))}
              </div>
              <input
                type="submit"
                value="Update"
                className="tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 
                tw:border tw:border-transparent tw:rounded-md tw:shadow-sm tw:text-sm 
                tw:font-medium tw:text-white tw:bg-black tw:hover:bg-gray-800"
                disabled={loading?true:false}
              />
            </form>
          </div>
        </div>
    </>
  );
};
export default UpdateProduct;