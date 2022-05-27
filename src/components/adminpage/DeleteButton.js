
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { url } from '../../api/Api';
import HookAxios from '../../hooks/HookAxios'

function DeleteButton({ id }) {

    const useAxios = HookAxios();
    const navigate = useNavigate();

    const idUrl = url + id;

    async function deleteHandle() {
        const confirmasjon = window.confirm("Er du sikker på at du vil fjerne dette produktet?");

        if (confirmasjon) {
            try {
                await useAxios.delete(idUrl);
                navigate("/admin/produkter");
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
        <button className='delete-btn' onClick={deleteHandle}>Fjern Produkt</button>
  )
}

export default DeleteButton