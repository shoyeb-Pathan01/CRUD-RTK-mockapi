import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_SERVER_URL;

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(API_BASE)
        setProducts(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex justify-between py-10">
        <h2>All Products</h2>
        <Link to="/create">
          <button className="bg-red-950 text-white px-2 py-1">Create Product</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {products.map((product) => (
          <div key={product.id} className="p-5 bg-[#eee] flex flex-col items-center justify-center">
            <h2 className="text-blue-950 text-xl py-2">{product.productName || "No Name"}</h2>
            <p className="text-lg pb-2">{product.desc || "No Description"}</p>
            {product.imgUrl && <img src={product.imgUrl} alt="product" className="mb-2" />}
            <div className="flex gap-x-2">
              <Link to={`/product/${product.id}`}>
                <button className="bg-red-950 text-white px-2 py-1">Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home