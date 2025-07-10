import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { remove } from '../redux/reducer/cartSlice';
import { toast } from 'react-toastify';

function Cart() {
  const { product } = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  const handleRemove = (id) => {
    dispatch(remove(id))
    toast.success("Your product is removed suuccessfully");
  }
  return (
    <div className="">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between">
          <h1 className=" md:px-5 py-2 text-xl font-semibold ">
            All Cart Products
          </h1>
          <div>
            <Link to="/">
              <button className="bg-red-950 text-white px-2 py-1">
                Go to Products
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full  my-10">
          {product.length === 0 ?
            <h2 className='text-center font-semibold italic text-2xl my-5'>You dont have any product in Cart</h2>
            : (
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-5 ">
                {product.map((item) =>
                  <div key={item.id} >
                    <div className="p-5 flex flex-col bg-[#eee] items-center justify-center">
                      <h2 className=" text-center text-blue-950 text-xl py-2">
                        {item.productName}
                      </h2>
                      <p className="text-lg pb-2">{item.desc}</p>
                      <img src={item.imgUrl} alt="product" className="" />
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="bg-red-950 justify-self-end text-white px-2 my-5 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Cart