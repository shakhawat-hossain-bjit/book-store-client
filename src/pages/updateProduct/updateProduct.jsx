import React, { useEffect, useState } from "react";
import "./updateProduct.style.css";
import { Controller, useForm } from "react-hook-form";
import bookAPI from "../../api/book/bookAPI";
import Spinner from "../../components/spinner/spinner";
const UpdateProduct = () => {
  const [productId, setProductId] = useState("");
  const [id, setId] = useState("");
  const [foundProduct, setFoundProduct] = useState(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 1,
      stock: 1,
      rating: 0,
      description: "",
    },
  });

  const {
    getProductById,
    product,
    setProduct,
    isLoadingProduct,
    updateProduct,
  } = bookAPI();

  const getProduct = (e) => {
    setFoundProduct(0);
    e.preventDefault();
    if (productId) {
      getProductById(productId);
    } else alert("Product Id is not provided");
  };

  useEffect(() => {
    setId(product?._id);
    setValue("title", product?.title);
    setValue("price", product?.price);
    setValue("stock", product?.stock);
    setValue("rating", product?.rating);
    setValue("description", product?.description);
    // console.log(product);
  }, [product]);

  //   console.log(product);
  // const handleUpdateProduct = (e) => {
  //   console.log("Update Clicked");
  //   e.preventDefault();
  //   const product = { id, title, price, stock, rating, description };
  //   console.log("product ", product);
  //   updateProduct(product);
  //   setProduct({});
  // };

  const handleOnUpdate = (data) => {
    const product = {
      id: id,
      title: getValues("title"),
      price: getValues("price"),
      stock: getValues("stock"),
      rating: getValues("rating"),
      description: getValues("description"),
    };
    console.log("ppp ", product);
    updateProduct(product);
    setProduct({});
  };

  return (
    <div className="update-product-form">
      <form onSubmit={getProduct}>
        <h2>Update Product</h2>
        <div>
          <label htmlFor="id">Product Id:</label>
          <input
            type="text"
            id="id"
            name="id"
            required
            onKeyUp={(e) => setProductId(e.target.value)}
            // disabled={`${foundProduct == 1 ? "true" : "false"}`}
            // disabled={`${foundProduct}`}
          />
          <input type="submit" value="Search" />
        </div>
      </form>
      {isLoadingProduct ? (
        <Spinner />
      ) : (
        product?._id && (
          <form onSubmit={handleSubmit(handleOnUpdate)}>
            <div>
              <div>
                <label htmlFor="title">Title:</label>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: "title is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length must be 6",
                    },
                    maxLength: {
                      value: 20,
                      message: "Minimum length must be 20",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      placeholder="Enter title"
                      {...field}
                      type="text"
                      // defaultValue={product?.title}
                      style={{
                        border: errors?.title ? "1px solid red" : "",
                      }}
                    />
                  )}
                />
                <span className="error-message">{errors?.title?.message}</span>
              </div>

              <div>
                <label htmlFor="price">Price:</label>
                <Controller
                  name="price"
                  control={control}
                  rules={{
                    required: "price is required",
                    min: {
                      value: 1,
                      message: "Minimum value is 1",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      placeholder="Enter price"
                      {...field}
                      type="number"
                      defaultValue={product?.price}
                      style={{
                        border: errors?.price ? "1px solid red" : "",
                      }}
                    />
                  )}
                />
                <span className="error-message">{errors?.price?.message}</span>
              </div>

              <div>
                <label htmlFor="stock">Stock:</label>
                <Controller
                  name="stock"
                  control={control}
                  rules={{
                    required: "stock is required",
                    min: {
                      value: 1,
                      message: "Minimum value is 1",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      placeholder="Enter stock"
                      {...field}
                      type="number"
                      defaultValue={product?.stock}
                      style={{
                        border: errors?.price ? "1px solid red" : "",
                      }}
                    />
                  )}
                />
                <span className="error-message">{errors?.stock?.message}</span>
              </div>

              <div>
                <label htmlFor="rating">Rating:</label>
                <Controller
                  name="rating"
                  control={control}
                  rules={{
                    required: "rating is required",
                    min: {
                      value: 0,
                      message: "Minimum value is 0",
                    },
                    max: {
                      value: 5,
                      message: "Maximum value is 5",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      placeholder="Enter rating"
                      {...field}
                      type="number"
                      step="0.01"
                      defaultValue={product?.rating}
                      style={{
                        border: errors?.rating ? "1px solid red" : "",
                      }}
                    />
                  )}
                />
                <span className="error-message">{errors?.rating?.message}</span>
              </div>

              <div>
                <label htmlFor="description">Description:</label>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: "description is required",
                    minLength: {
                      value: 5,
                      message: "Minimum value is 5",
                    },
                    maxLength: {
                      value: 200,
                      message: "Maximum value is 200",
                    },
                  }}
                  render={({ field }) => (
                    <textarea
                      placeholder="Enter description"
                      {...field}
                      type="text"
                      defaultValue={product?.description}
                      style={{
                        border: errors?.description ? "1px solid red" : "",
                      }}
                    />
                  )}
                />
                <span className="error-message">
                  {errors?.description?.message}
                </span>
              </div>

              <input type="submit" value="Update" />
            </div>
          </form>
        )
      )}
    </div>
  );
};

export default UpdateProduct;
