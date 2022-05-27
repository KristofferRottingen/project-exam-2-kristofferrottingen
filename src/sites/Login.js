import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { urlJWT } from "../api/Api";
import Header from "../components/text/Heading";
import AuthCon from "../context/Auth";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Navs from "../components/navbars/Navbar";

const userSchema = yup.object().shape({
	username: yup.string().required("Brukernavnet ditt mangler eller er ikke gyldig"),
	password: yup.string().required("Passordet ditt mangler eller er ikke gyldig"),
});

export default function LoginForm() {

    const navigate = useNavigate();
	
	const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema),
    });

    const [authState, setAuthState] = useContext(AuthCon);

	async function onSubmit(data) {

		console.log(errors);

		try {
			const resp = await axios.post(urlJWT, data);
			console.log(resp.data);
            setAuthState(resp.data);
            navigate("/admin");
		} catch (error) {
			console.log(error);	
		}
	}

	return (
		<>
            <Navs />
            <div className="login-page">
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <Header title="Logg inn" />
                    <fieldset>
                        <div className="login-section">
                            <label>Brukernavn</label>
                            <input {...register("username")} />
                            {errors.username && <span>{errors.username.message}</span>}
                        </div>

                        <div className="login-section">
                            <label>Passord</label>
                            <input {...register("password")} type="password" />
                            {errors.password && <span>{errors.password.message}</span>}
                        </div>
                        <button>Logg inn</button>
                    </fieldset>
                </form>
		    </div>
        </>
	);
}