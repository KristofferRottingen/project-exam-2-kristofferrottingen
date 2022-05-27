import React from 'react'
import { url } from '../../api/Api';

function AdminOrdre() {
  
    const fetchProduct = async () => {
        const resp = await fetch(url);
        const json = await resp.json();
        console.log(json);
    }
  
  return (
    <div>

    </div>
  )
}

export default AdminOrdre