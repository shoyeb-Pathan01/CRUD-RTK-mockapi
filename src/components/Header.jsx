import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'

function Header() {
  const cartCount = useSelector(state => state.cart.product.length);
  return (
    <div className=" ml-10 ">
    <div className=" relative pl-2  ">
      <Link to="/cart" className="px-3    transform delay-100">
        
          <span className="absolute rounded-full text-xs top-4 w-4 my-auto h-4 text-center bg-red-400 text-white px-1">
            {cartCount}
          </span>
      

        <span className="inline">
         
          <ShoppingCart size={25} />
        </span>
      </Link>
    </div>
  </div>
  )
}

export default Header