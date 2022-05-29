import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { enquirFeedback } from '../../api/Api';
import Loader from '../Loader';
import AdminNavbar from '../navbars/AdminNavbar';
import Header from '../text/Heading';
import AdminMenu from './AdminMenu';
import AdminModal from './AdminModal';
import DeleteButton from './DeleteButton';

function AdminMessages() {

    const [feedback, setFeedback] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const noFeedback = feedback.length === 0;

    useEffect(() => {
        fetchMessage();
    }, []); 

    const fetchMessage = async () => {
        try {
            const resp = await fetch(enquirFeedback);

            if (resp.ok) {
                const json = await resp.json();
                setFeedback(json);
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
            <>
                <AdminNavbar />
                <div className="admin-page">
                    <AdminMenu />
                    <div className='admin-message-page'>
                        <Header title='Feedback' />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className='name-col'>Navn</th>
                                    <th>E-post</th>
                                    <th>Melding</th>
                                    <th>Se mer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                   <th>
                                       <Loader />
                                   </th>
                                </tr>
                            </tbody>
                        </Table>
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
        <div className="admin-page">
            <AdminMenu />
            <div className='admin-message-page'>
                <Header title='Feedback' />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Produkt</th>
                            <th>E-post</th>
                            <th>Melding</th>
                            <th>Se mer</th>
                        </tr>
                    </thead>
                    {noFeedback ? (
                            <tbody>
                                <tr>
                                    <th className='no-message'>
                                        Ingen feedback er sent
                                    </th>
                                </tr>
                            </tbody>
                        ) : (
                            feedback.map((data) => {
                                const id = data.id;
                                const productImg = data.acf.sku;
                                const productName = data.acf.navn;
                                const melding = data.acf.pb;
                                const epost = data.acf.tb;


                                return (
                                    <tbody key={id}>
                                        <tr>
                                            <td><img src={productImg} alt={productName} /></td>
                                            <td>{epost}</td>
                                            <td>{melding}</td>
                                            <td> 
                                                <button onClick={() => setShow(true)}>Se mer</button>

                                                <AdminModal open={show} onClose={() => setShow(false)}>
                                                    <h3>Feedback: {id}</h3>
                                                    <div className='modal-info'>
                                                        <p className='name-col'>Produkt: <span>{productName}</span></p>
                                                        <p>E-post: <span>{epost}</span></p>
                                                    </div>
                                                    <div className='modal-message'>
                                                        <p>Melding:</p>
                                                        <p className='message'>{melding}</p>
                                                    </div>
                                                </AdminModal>
                                                
                                            </td>
                                            <td>
                                                <DeleteButton id={id} />
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        )
                    }
                </Table>
            </div> 
        </div>
    </>
  )
}

export default AdminMessages