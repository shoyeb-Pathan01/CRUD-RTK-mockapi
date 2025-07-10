import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_SERVER_URL;

function Update() {
  const id = localStorage.getItem("id");
  const [productName, setProductName] = useState(localStorage.getItem("productName") || "");
  const [desc, setDesc] = useState(localStorage.getItem("desc") || "");
  const [imgUrl, setImgUrl] = useState(localStorage.getItem("imgUrl") || "");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName.trim() || !desc.trim() || !imgUrl.trim()) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axios.put(
        `${API_BASE}/${id}`,
        { productName, desc, imgUrl }
      );
      toast.success("You have successfully updated the product!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update product.");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-blue-50">
        <div className="w-11/12 mx-auto text-red-950 py-5 flex justify-between items-center">
          <h1 className="text-center text-blue-950 my-2 text-xl">
            CRUD Operation
          </h1>
          <div>
            <Link to="/">
              <button className="bg-red-950 text-white px-2 py-1">
                All Product
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto ">
        <div className="flex flex-col items-center mx-auto w-8/12 my-10">
          <h2 className=" text-center text-xl py-2 font-bold">
            Update A Product
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              className="border border-red-500 mb-3 px-2 w-[300px]"
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />
            <textarea
              rows="4"
              name="desc"
              placeholder="Enter Product Description"
              className="border border-red-500 mb-3 px-2 w-[300px]"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
            <input
              type="text"
              name="imgUrl"
              placeholder="Enter Product image url"
              className="border border-red-500 mb-3 px-2 w-[300px]"
              value={imgUrl}
              onChange={e => setImgUrl(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-950 text-white px-2 py-1"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update