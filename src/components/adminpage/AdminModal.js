import React from 'react'

function AdminModal({ open, children, onClose }) {
    if (!open) return null

  return (
    <>  
        <div className='admin-modal-overlay' />
        <div className='admin-modal'>
            <button onClick={onClose}>X</button>
            {children}
        </div>
    </>
  )
}

export default AdminModal;