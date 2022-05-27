import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { messageUrl } from '../../api/Api';
import Loader from '../Loader';
import AdminNavbar from '../navbars/AdminNavbar';
import Header from '../text/Heading';
import AdminMenu from './AdminMenu';
import AdminModal from './AdminModal';

function AdminMessages() {

    const [messageInfo, setMessageInfo] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const noMessage = messageInfo.length === 0;

    useEffect(() => {
        fetchMessage();
    }, []); 

    const fetchMessage = async () => {
        try {
            const resp = await fetch(messageUrl);

            if (resp.ok) {
                const json = await resp.json();
                setMessageInfo(json);
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
                        <Header title='Henvendelser' />
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
                <Header title='Henvendelser' />
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
                    {noMessage ? (
                            <tbody>
                                <tr>
                                    <th className='no-message'>
                                        Ingen meldinger er sent
                                    </th>
                                </tr>
                            </tbody>
                        ) : (
                            messageInfo.map((data) => {
                                const id = data.id;
                                const navn = data.acf.navn;
                                const melding = data.acf.pb;
                                const epost = data.acf.tb;


                                return (
                                    <tbody key={id}>
                                        <tr>
                                            <td>{id}</td>
                                            <td className='name-col'>{navn}</td>
                                            <td>{epost}</td>
                                            <td>{melding}</td>
                                            <td> 
                                                <button onClick={() => setShow(true)}>Se mer</button>

                                                <AdminModal open={show} onClose={() => setShow(false)}>
                                                    <h3>Melding: {id}</h3>
                                                    <div className='modal-info'>
                                                        <p className='name-col'>Navn: <span>{navn}</span></p>
                                                        <p>E-post: <span>{epost}</span></p>
                                                    </div>
                                                    <div className='modal-message'>
                                                        <p>Melding:</p>
                                                        <p className='message'>{melding}</p>
                                                    </div>
                                                </AdminModal>
                                                
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