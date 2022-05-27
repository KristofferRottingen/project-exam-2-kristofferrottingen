import React from 'react';
import { useState, useEffect } from "react";
import { productsUrl } from '../../api/Api';
import GetProducts from '../GetProducts';
import Loader from '../Loader';
import ProductFilter from './ProductFilter';


function ProductMain() { 

    const [product, setProduct] = useState([]);
    const [catFiltered, setCatFiltered] = useState([]);
    const [activeCategory, setActiveCategory] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchProduct();
    }, []); 


    const fetchProduct = async () => {
        try {
            const resp = await fetch(productsUrl);
            
            if (resp.ok) {
                const json = await resp.json();
                setProduct(json);
                setCatFiltered(json);
            } else {
                setError('There seems to be an errror with the fecth call');
            }

        } catch (error) {
            setError(error.toString());
        } finally {
            setLoading (false);
        }
    }

    if (loading) {
        return (
             <div className='product-page-main'>
                <ProductFilter product={product} setCatFiltered={setCatFiltered} activeCategory={activeCategory} setActiveCategory={setActiveCategory}  />
                <div className='products-section'>
                    <Loader />
                </div>
            </div>
        )
    }

    if (error) {
        return <div>ERROR: {error}</div>
    }

    return (
        <div className='product-page-main'>
            <ProductFilter product={product} setCatFiltered={setCatFiltered} activeCategory={activeCategory} setActiveCategory={setActiveCategory}  />
            <div className='products-section'>
                <div className='products-grid'>
                    {catFiltered.map((data) => {
                        const id = data.id;
                        const title = data.acf.navn;
                        const pris = data.acf.pris;
                        const image = data.acf.img1;

                        return <GetProducts key={id} id={id} img={image} title={title} pris={pris} />;
                    })}
                </div>
            </div>
        </div>
    ) 
}

export default ProductMain;