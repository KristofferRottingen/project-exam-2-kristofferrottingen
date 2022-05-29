import React, { useEffect } from 'react';
import { InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';

function ProductFilter({ setActiveCategory, activeCategory, setCatFiltered, product}) {
  
  useEffect(() => {
    if (activeCategory === 1) {
      setCatFiltered(product);
      return;
    }
    
    const filtered = product.filter((prod) => 
      prod.categories.includes(activeCategory)
    );

    setCatFiltered(filtered);
    // eslint-disable-next-line
  }, [activeCategory]);
  
  return (
    <>
        <div className='product-page-filter filter-web'>
            <h4>HANDLE ETTER</h4>
            <div className='line-filter'></div>
            <h4>KATEGORI</h4>
            <button className={activeCategory === 1 ? "active" : ""} onClick={() => setActiveCategory(1)}>Alle produkter</button>
            <button className={activeCategory === 3 ? "active" : ""} onClick={() => setActiveCategory(3)}>Sykkel/sparkesykkel</button>
            <button className={activeCategory === 4 ? "active" : ""} onClick={() => setActiveCategory(4)}>Sykkellås</button>
            <button className={activeCategory === 5 ? "active" : ""} onClick={() => setActiveCategory(5)}>Tilbehør</button>
            <div className='line-filter'></div>
            <h4>PRIS</h4>
            <button className={activeCategory === 8 ? "active" : ""} onClick={() => setActiveCategory(8)}>kr 0,00 - kr 500,00</button>
            <button className={activeCategory === 9 ? "active" : ""} onClick={() => setActiveCategory(9)}>kr 500,00 - kr 1500,00</button>
        </div>
        <div className='filter-mobile'>
            <InputGroup className="mb-3">
              <DropdownButton
              variant="outline-secondary"
              title="Handle etter"
              id="input-group-dropdown-1"
              >
              <h4>KATEGORI</h4>
              <button className={activeCategory === 1 ? "active" : ""}  onClick={() => setActiveCategory(1)}>Alle produkter</button>
              <button className={activeCategory === 3 ? "active" : ""} onClick={() => setActiveCategory(3)}>Sykkel/sparkesykkel</button>
              <button className={activeCategory === 4 ? "active" : ""} onClick={() => setActiveCategory(4)}>Sykkellås</button>
              <button className={activeCategory === 5 ? "active" : ""} onClick={() => setActiveCategory(5)}>Tilbehør</button>
              <Dropdown.Divider />
              <h4>PRIS</h4>
              <button className={activeCategory === 8 ? "active" : ""} onClick={() => setActiveCategory(8)}>kr 0,00 - kr 500,00</button>
              <button className={activeCategory === 9 ? "active" : ""} onClick={() => setActiveCategory(9)}>kr 500,00 - kr 1500,00</button>
              </DropdownButton>
            </InputGroup>
        </div>
    </>
  )
}

export default ProductFilter