import React from 'react';
import { useState, useEffect } from "react";
import { homeProducts } from '../../api/Api';
import GetProducts from '../GetProducts';
import Loader from '../Loader';

function HomeProducts() { 
  
    const [product,setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        async function fetchHomeproduct() {
            try{
                const resp = await fetch(homeProducts);

                if(resp.ok) {
                    const json = await resp.json();
                    setProduct(json);
                } else {
                    setError("Something in the API might be wrong!");
                }
            
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchHomeproduct();
    }, []);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>ERROR: {error}</div>
    }
  
    return (
        <div className='home-products-section'>
            <h2>Bestselgere</h2>
            <div className='line-hvit'></div>
            <div className='home-products'>
                {product.map( function (data){
                    const id = data.id;
                    const title = data.acf.navn;
                    const pris = data.acf.pris;
                    const image = data.acf.img1;

                    return <GetProducts key={id} id={id} img={image} title={title} pris={pris} />;
                })}
            </div>
        </div>
    )
}

export default HomeProducts;