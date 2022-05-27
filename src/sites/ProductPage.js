import React from 'react'
import Navs from '../components/navbars/Navbar'
import ProductHero from '../components/productspage/ProductHero'
import ProductMain from '../components/productspage/ProductMain'

function ProductPage() {
  return (
    <>
      <Navs />
      <div className='product-page'>
        <ProductHero />
        <ProductMain />
      </div>
    </>
  )
}

export default ProductPage