import React from 'react'
import ContactForm from '../components/contactpage/ContactForm'
import Navs from '../components/navbars/Navbar';
import Header from "../components/text/Heading";


function ContactPage() {
  return (
    <>
      <Navs />
      <div className='contact-page'>
        <div className='contact-page-form'>
          <Header title="KONTAKT OSS" />
          <ContactForm />
        </div>
    </div>
    </>
  )
}

export default ContactPage