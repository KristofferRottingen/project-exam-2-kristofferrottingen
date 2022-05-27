import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import HookAxios from '../../hooks/HookAxios';
import { url } from '../../api/Api';

const userSchema = yup.object().shape({
    email: yup.string().required("Din e-post adresse mangler").email("Denne e-posten finnes ikke, eller er skrevet feil"),
    melding: yup.string().required("Vennligst skriv din feedback her").min(10, "Feedbacken må inneholde minimum ti bokstaver"),
});


function EnquiryForm({ productImg, productName }) {

    

    const useAxios = HookAxios();
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema),
    });

    async function dataSubmit(data) {

        data = {
            status: "publish",
            categories: "13",
            title: data.email,
            fields: {
                navn: productName,
                sku: productImg,
                pb: data.melding,
                tb: data.email,
            },
        };

        console.log(data);

        const form = document.querySelector(".enquiry-section");

        try {
            
			const resp = await useAxios.post(url, data);
			console.log(resp.data);

            if(resp.data.modified){
                form.innerHTML=`<h2>Takk for din feedback!</h2>`;
            }
		} catch (error) {
			console.log(error);
		}
    }

    console.log(errors);

    return (
        <form className='enquiry-form' onSubmit={handleSubmit(dataSubmit)}>
            <label className='l-top'>E-post</label>
            <input className='i-email' {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
            <label className='l-bottom'>Melding</label>
            <textarea type="text" className='enquiry-message' {...register("melding")} />
            {errors.melding && <span>{errors.melding.message}</span>}

            <button>Send</button>
        </form>
    )
}

EnquiryForm.propTypes = {
  productImg: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
}

export default EnquiryForm;