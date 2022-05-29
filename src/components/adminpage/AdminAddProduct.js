import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import HookAxios from "../../hooks/HookAxios";
import { baseUrl, url } from "../../api/Api";
import AdminNavbar from "../navbars/AdminNavbar";
import AdminMenu from "./AdminMenu";
import Header from "../text/Heading";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
	navn: yup.string().required("Produktet må ha et navn"),
    sku: yup.string().required("Produktet må ha et sku"),
    pb: yup.string().required("Produktet må ha en produkt beskrivelse"),
    str: yup.string().required("Produktet må ha en størrelse"),
    tb: yup.string().required("Produktet må ha en teknisk beskrivelse"),
    va: yup.string().required("Produktet må ha en vaskeanvisning"),

});

export default function AdminAddProduct () {
    const [imageMedia, setImageMedia] = useState([]);

    const mediaUrl = baseUrl + "wp/v2/media?per_page=100";

    const navigate = useNavigate();

	const useAxios = HookAxios();

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

    useEffect(() => {
        async function Media() {
            try {
                const resp = await useAxios.get(mediaUrl);
                setImageMedia(resp.data)
            } catch (error) {
                console.log(error);
            }
        }
        Media();
        // eslint-disable-next-line
    }, []);


	async function onSubmit(data) {

		data = {
            status: "publish",
            categories: "1",
            title: data.navn,
            fields: {
                img1: data.featured_media,
                navn: data.navn,
                pb: data.pb,
                pris: data.pris, 
                sku: data.sku,
                str: data.str,
                tb: data.tb,
                va: data.va,
            },
        };


    

		try {
			const resp = await useAxios.post(url, data);
            console.log(resp);
            navigate("/admin/produkter");
		} catch (error) {
			console.log(error);
		}
	}



	return (
        <>
            <AdminNavbar />
            <div className="admin-page">
                <AdminMenu />
                <div className="admin-add-products">
                    <div className="add-products-content">
                        <Header title="Legg til produkt" />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset>
                                <div className="row-1 rows">
                                    <div className="field field-padding">
                                        <label>NAVN</label>
                                        <input {...register("navn")} />
                                        {errors.navn && <span>{errors.navn.message}</span>}
                                    </div>


                                    <div className="field field-padding">
                                        <label>SKU</label>
                                        <input {...register("sku")} />
                                        {errors.sku && <span>{errors.sku.message}</span>}
                                    </div>
                                </div>

                                <div className="row-2 rows">
                                    <div className="field">
                                        <label>PRIS</label>
                                        <input {...register("pris")} />
                                    </div>

                                    <div className="field">
                                        <label>STR</label>
                                        <input {...register("str")} />
                                        {errors.str && <span>{errors.str.message}</span>}
                                    </div>
                                </div>

                                <div className="row-3 rows">
                                    <div className="field">
                                        <label>PRODUKT BESKRIVELSE</label>
                                        <textarea {...register("pb")} />
                                        {errors.pb && <span>{errors.pb.message}</span>}
                                    </div>

                                    <div className="field field-padding">
                                        <label>Bilde</label>
                                        <select {...register("featured_media")}>
                                            <option value=''>Velg bilde</option>
                                            {imageMedia.map((image) => {
                                                return (
                                                    <option key={image.id} value={image.id}>    
                                                        {image.title.rendered}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="row-4 rows">
                                    <div className="field">
                                        <label>TEKNISK BESKRIVELSE</label>
                                        <textarea {...register("tb")} />
                                        {errors.tb && <span>{errors.tb.message}</span>}
                                    </div>

                                    <div className="field">
                                        <label>VASKEANVISNING</label>
                                        <textarea {...register("va")} />
                                        {errors.va && <span>{errors.va.message}</span>}
                                    </div>
                                </div>

                                <button>Legg til</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </>
	);
}