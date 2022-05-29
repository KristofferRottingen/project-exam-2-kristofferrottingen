import React from 'react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { url, pdvlProducts } from '../api/Api';
import Loader from '../components/Loader';
import Navs from '../components/navbars/Navbar';
import GetProducts from '../components/GetProducts';
import { Tabs, Tab } from 'react-bootstrap';
import EnquiryForm from '../components/enquiry/EnquiryForm';
 

function DetailsPage() {
    const [info, setInfo] = useState([]);
    const [conProd, setConProd] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    let navigate = useNavigate();
    const { id } = useParams();
    if(!id) {
        navigate("/produkter");
    }

    const detailUrl = url + id;

    
    
    

   
    useEffect( function() {
        async function fetchInfo() {
            try{
                const resp = await fetch(detailUrl);
                const response = await fetch(pdvlProducts);

                if (resp.ok && response.ok) {
                    const data = await resp.json();
                    setInfo(data);
                    const products = await response.json();
                    setConProd(products);
                } else {
                    setError("Some issue has been detected");
                }
            
            } catch (error) {
                setError(error.toString());
            } finally{
                setLoading(false);
            }
        }fetchInfo();

        // eslint-disable-next-line
    }, [detailUrl]);

    if (loading) {
        return (
            <>
                <Navs />
                <Loader />
            </>
            
        )
    }

    if (error) {
        return <div>ERROR: {error}</div>
    }


  return (
    <>
        <Navs />
        <div className='details-page-section'>
            <div className='details-page-left'>
                <img className='details-page-main-img' src={info.acf.img1} alt={info.acf.navn}/>
                <div className='details-line'></div>
                <h4>Produkter du og vil like</h4>
                <div className='pdvl-section'>
                    {conProd.map((prod) => {
                        const id = prod.id;
                        const title = prod.acf.navn;
                        const pris = prod.acf.pris;
                        const image = prod.acf.img1;

                        return <GetProducts key={id} id={id} img={image} title={title} pris={pris} />
                    })}
                </div>
            </div>
            <div className='details-right'>
                <div className='details-right-content'>
                    <h1>{info.acf.navn}</h1>
                    <p>{info.acf.pb}</p>
                    <div className='details-price-sku'>
                        <div className='details-price'>
                            <p>kr <span>{info.acf.pris}</span></p>
                        </div>
                        <div className='details-sku'>
                            <span>PÅ LAGER</span>
                            <p>SKU#: {info.acf.sku}</p>
                        </div>  
                    </div>
                    <div className='details-price-line'></div>
                    <div className='products-size'>
                        <p>Størrelse</p>
                        <button>{info.acf.str}</button>
                    </div>
                    <div className='product-spec'>
                        <Tabs defaultActiveKey="va" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="va" title="Vaskeanvisning">
                                <p>{info.acf.va}</p>
                            </Tab>
                            <Tab eventKey="tb" title="Teknisk Beskrivelse">
                                <p>{info.acf.tb}</p>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className='enquiry-section'>
                        <h4>Vi tar gjerne imot feedback på dette produktet!</h4>
                        <EnquiryForm productName={info.acf.navn} productImg={info.acf.img1} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DetailsPage;