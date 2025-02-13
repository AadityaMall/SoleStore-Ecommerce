import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../redux/actions/productAction";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import {
  AccountTree,
  Description,
  ProductionQuantityLimits,
  Spellcheck,
  CurrencyRupee,
} from "@mui/icons-material";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstants";
const NewProduct = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(newProduct(myForm));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  return (
    <>
      <div className="row">
          <h1 className="tw:font-brand tw:font-bold text-center">Create New Product</h1>
          <div className="tw:w-full tw:flex tw:justify-center">
            <form
              className="tw:max-w-[50%] tw:mt-3"
              encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
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
                  onChange={createProductImagesChange}
                  required
                />
              </div>
              <div className="tw:w-full tw:flex tw:overflow-x-auto tw:my-4">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" className="tw:max-w-[400px] tw:px-2"/>
                ))}
              </div>
              <input
                type="submit"
                value="Create"
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
export default NewProduct;