/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productApi";
import { server } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { Skeleton } from "../../../components/loader";
import { useFileHandler } from "6pp";

const Productmanagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();

  const { data: productDetails, isLoading, isError } = useProductDetailsQuery(
    params.id!
  );

  const { name, category, photos, stock, price } = productDetails?.data || {
    name: "",
    category: "",
    photos: [],
    price: 0,
    stock: 0,
  };

  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const photosFiles = useFileHandler("multiple", 10, 5);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
       const formData = new FormData();

       if (nameUpdate) formData.set("name", nameUpdate);
       if (categoryUpdate) formData.set("category", categoryUpdate);
       if (priceUpdate) formData.set("price", priceUpdate.toString());
       if (stockUpdate !== undefined)
         formData.set("stock", stockUpdate.toString());

       if (photosFiles.file && photosFiles.file.length > 0) {
         photosFiles.file.forEach((file) => {
           formData.append("photos", file);
         });
       }

       const res = await updateProduct({
         userId: user?._id!,
         productId: productDetails?.data._id!,
         formData,
       });

       responseToast(res, navigate, "/admin/product");
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteHandle = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: productDetails?.data._id!,
    });
    responseToast(res, navigate, "/admin/product");
  };


  useEffect(() => {
    if (productDetails) {
      setNameUpdate(productDetails?.data.name!);
      setCategoryUpdate(productDetails?.data.category!);
      setPriceUpdate(productDetails?.data.price!);
      setStockUpdate(productDetails?.data.stock!);
    }
  }, [productDetails]);

  
  if(isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <strong>ID - {productDetails?.data._id}</strong>
              <img src={photos[0]?.url} alt="Product" />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              <h3>Rs {price}</h3>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandle}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Photos</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={photosFiles.changeHandler}
                  />
                </div>

                {photosFiles.error && <p>{photosFiles.error}</p>}

                {photosFiles.preview && (
                  <div
                    style={{ display: "flex", gap: "1rem", overflowX: "auto" }}
                  >
                    {photosFiles.preview.map((img, i) => (
                      <img
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                        key={i}
                        src={img}
                        alt="New Image"
                      />
                    ))}
                  </div>
                )}
                <button disabled={btnLoading} type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
