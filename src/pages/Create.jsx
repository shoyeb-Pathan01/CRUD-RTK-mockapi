
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify';

function Create() {
  const [product, setProduct] = useState({
    productName: "",
    desc: "",
    imgUrl: ""
  })
  const navigate= useNavigate();
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://686b645de559eba9087253b2.mockapi.io/crud-project",product)
      setProduct({
        productName: "",
        desc: "",
        imgUrl: ""
      });      

      navigate("/");
      toast.success("You have successfully Created Product");
    } catch (error) {
      console.log(error)
       toast.error("Something went wrong");
    }
  }


  
  return (
    <div>
      {/* header */}
      <div className="bg-blue-50">
        <div className="w-11/12 mx-auto text-red-950 py-5 flex justify-between items-center">
          <h1 className="text-center text-blue-950 my-2 text-xl">
            CRUD Operation
          </h1>
          <div>
            <Link to="/">
              <button className="bg-red-950 text-white px-2 py-1">
                All Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="w-11/12 mx-auto ">
        <div className="flex flex-col items-center mx-auto w-full sm:w-8/12 my-10">
          <h2 className=" text-center text-xl py-2 font-bold">Add A Product</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text "
              name="productName"
              placeholder="Enter Product Name"
              className="border border-red-500 mb-3 px-2 w-[300px]"
              value={product.productName}
              onChange={handleChange}
            />
            <textarea
              rows="4"
              type="text"
              name="desc"
              placeholder="Enter Product Description"
              className="border border-red-500 mb-3 px-2 w-[300px]"
              value={product.desc}
            onChange={handleChange}
            />
            <input
              type="text"
              name="imgUrl"
              placeholder="Enter Product image url"
              className="border border-red-500 mb-3 px-2 w-[300px]"
              value={product.imgUrl}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-red-950 w-[100px] mx-auto mb-4 text-white px-2 py-1"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create