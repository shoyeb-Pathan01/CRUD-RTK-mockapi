import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../redux/reducer/cartSlice';

const API_BASE = import.meta.env.VITE_SERVER_URL;

function Product() {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.product);

  const handleUpdate = () => {
    localStorage.setItem("id", singleProduct.id);
    localStorage.setItem("productName", singleProduct.productName);
    localStorage.setItem("desc", singleProduct.desc);
    localStorage.setItem("imgUrl", singleProduct.imgUrl);
    navigate("/update");
  };

  const handleAddToCart = () => {
    const alreadyExists = cartItems.find((item) => item.id === singleProduct.id);
    if (alreadyExists) {
      toast.info("Product is already in your cart!");
    } else {
      dispatch(add(singleProduct));
      toast.success("Product added to cart successfully!");
    }
  };

  useEffect(() => {
    async function getSingleProduct() {
      try {
        const response = await axios.get(`${API_BASE}/${id}`)
        setSingleProduct(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    if (id) getSingleProduct()
  }, [id])

  async function handleDelete() {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("You have successfully deleted Product");
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex justify-between py-10">
        <h2>Single Product</h2>
        <div className="flex gap-x-5">
          <button
            onClick={handleUpdate}
            className="bg-red-950 text-white px-2 py-1"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-950 text-white px-2 py-1"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="">
        <div className="p-5 flex flex-col  items-center justify-center">
          <h2 className=" text-center text-blue-950 text-xl py-2">
            {singleProduct?.productName || "No Name"}
          </h2>

          <p className="text-lg pb-2">{singleProduct?.desc || "No Description"}</p>
          {singleProduct?.imgUrl && <img src={singleProduct.imgUrl} alt="product" className="" />}

          <div className="flex gap-x-10">
            <button
              onClick={handleAddToCart}
              className="bg-red-950 text-white px-2 py-1 my-5"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-red-950 text-white px-2 py-1 my-5"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product