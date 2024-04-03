import React, { useEffect, useState } from "react";
import "../../Layout/css/NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  AccountTree,
  Description,
  ProductionQuantityLimits,
  Spellcheck,
  CurrencyRupee,
} from "@mui/icons-material";
import SideBar from "./SideBar";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstants";
const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
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
    console.log(images)
    console.log(Stock)
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
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  return (
    <>
      <div className="dashboard row">
        <div className="col-lg-2">
          <SideBar />
        </div>
        <div className="dashboard-mainContainer col-lg-10">
          <h1 className="headings-for-page text-center">Create New Product</h1>
          <div className="new-product-admin">
            <form
              className="createProductForm"
              encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
            >
              <div className="form-group mb-4">
                <Spellcheck />
                <input
                  type="text"
                  className="form-control new-product-input"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <CurrencyRupee />
                <input
                  type="Number"
                  className="form-control new-product-input"
                  placeholder="Price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <Description />
                <textarea
                  className="form-control new-product-input"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <AccountTree />
                <select
                  className="form-control new-product-input"
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
              <div className="form-group mb-4">
                <ProductionQuantityLimits />
                <input
                  type="Number"
                  className="form-control new-product-input"
                  placeholder="Stock"
                  name="Stock"
                  value={Stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="form-group mb-4 image-input">
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
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
              <input
                type="submit"
                value="Create"
                className="btn"
                id="submitButtonProduct"
                disabled={loading?true:false}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewProduct;
