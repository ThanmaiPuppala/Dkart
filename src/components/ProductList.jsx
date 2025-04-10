import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProducts } from '../features/shopCart/productSlice'
import { addToCart } from '../features/shopCart/cartSlice'

function ProductList() {
  const {items:products,status}=useSelector((state)=>state.products)
  const dispatch=useDispatch();
  useEffect(()=>{
if(status==='idle'){
  dispatch(fetchProducts())
}
  },[status])
  if(status==='loading') return <p>Loading Products...</p>
  if(status==='failed') return <p>Failed to load Products.Please try again</p>
  return (
    <>
        <Navbar/>
        <div className='product-list'>
        {
          products.map(product=>(
            <div className="product-card" key={product.id}>
          <img src={product.images} alt={product.title} />
          <h2>{product.title.length>20?`${product.title.slice(0,30)}...`:product.title}</h2>
          <p>Price:${product.price}</p>
          <button onClick={()=>dispatch(addToCart(product))}>Add To Cart</button>
        </div>
          ))
        }
        </div>
    </>
  )
}

export default ProductList