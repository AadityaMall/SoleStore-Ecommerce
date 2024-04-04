import React, { useEffect, useState } from "react";
import "../../Layout/css/NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import {
  AccountTree,
  Description,
  ProductionQuantityLimits,
  Spellcheck,
  CurrencyRupee,
} from "@mui/icons-material";
import SideBar from "./SideBar";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
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
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Created Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, id, product, updateError]);

  return (
    <>
      <div className="dashboard row">
        <div className="col-lg-2">
          <SideBar />
        </div>
        <div className="dashboard-mainContainer col-lg-10">
          <h1 className="headings-for-page text-center">Update Product</h1>
          <div className="new-product-admin">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
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
                  onChange={updateProductImagesChange}
                  required
                />
              </div>{" "}
              <div id="createProductFormImage">
                {oldImages && oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
                disabled={loading ? true : false}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateProduct;
