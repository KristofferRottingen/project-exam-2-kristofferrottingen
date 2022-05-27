import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productsUrl } from '../../api/Api';
import Loader from '../Loader';
import AdminNavbar from '../navbars/AdminNavbar';
import Header from '../text/Heading';
import AdminMenu from './AdminMenu';


function AdminProducts() {

    const [productsData, setProductsData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        fetchProduct();
    }, []); 

    const fetchProduct = async () => {
        try {
            const resp = await fetch(productsUrl);

            if (resp.ok) {
                const json = await resp.json();
                setProductsData(json);
            } else {
                setError("Something in the API might be wrong!");
            }

        } catch (error) {
            setError(error.toString());
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <>
                <AdminNavbar />
                <div className='admin-page'>
                    <AdminMenu />
                    <div className='admin-product-page'>
                        <Header title='Produkter' />
                        <button><Link to="/admin/legg-til-produkt">Legg til product</Link></button>
                        <Loader />
                    </div>
                </div>
            </>
        )
    }

    if (error) {
        return <div>ERROR: {error}</div>
    }



  return (
    <>
        <AdminNavbar />
        <div className='admin-page'>
            <AdminMenu />
            <div className='admin-product-page'>
                <Header title='Produkter' />
                <button><Link to="/admin/legg-til-produkt">Legg til product</Link></button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Bilde</th>
                            <th>Navn</th>
                            <th className='str-col'>Str</th>
                            <th>Pris</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    {productsData.map((data) => {
                        const id = data.id;
                        const title = data.acf.navn;
                        const pris = data.acf.pris;
                        const image = data.acf.img1;
                        const str = data.acf.str

                        return (
                            <tbody key={id}>
                                <tr>
                                    <td>{id}</td>
                                    <td><img src={image} alt={title}/></td>
                                    <td>{title}</td>
                                    <td className='str-col'>{str}</td>
                                    <td>{pris}</td>
                                    <td><Link key={id} to={`edit/${id}`}>Edit</Link></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </Table>
            </div>
        </div>  
    </>
  )
}

export default AdminProducts