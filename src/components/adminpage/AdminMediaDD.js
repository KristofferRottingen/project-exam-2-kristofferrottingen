import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { baseUrl } from '../../api/Api';
import HookAxios from '../../hooks/HookAxios';

function AdminMediaDD({ register }) {
    const [imageMedia, setImageMedia] = useState();
    
    const mediaUrl = baseUrl + "wp/v2/media";

    const useAxios = HookAxios();

    useEffect(() => {
        async function Media() {
            try {
                const resp = await useAxios.get(mediaUrl);
                console.log(resp.data);
                setImageMedia(resp.data)
            } catch (error) {
                console.log(error);
            }
        }
        Media();
    }, []);

    return (
        <select name='featured_media' ref={register}>
            <option value=''>Velg bilde</option>
            {imageMedia.map((image) => {
                return (
                    <option key={image.id} value={image.id}>    
                        {image.title.rendered}
                    </option>
                )
            })}
        </select>
    )
}

export default AdminMediaDD;

AdminMediaDD.propTypes = {
    register: PropTypes.func,
}

AdminMediaDD.defaultProps = {
    register: () => {},
}