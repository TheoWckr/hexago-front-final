import React, { useEffect, useState } from 'react'
import { axios, MAIN_ADRESS } from '../../utils/utilsAxios';
import "./EmailVerification.css";
import {useParams} from "react-router";
import { toast } from 'react-toastify';

export const EmailVerificationComponent = () => {
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const {id, token} = useParams<{ id: string, token: string }>();

    async function checkTokenVerifyEmail() {
        await axios.get(MAIN_ADRESS + "users/" + id + "/verify/" + token)
        .then((res: any) => {
            setIsValidated(true)
        })
        .catch((err: any) => {
            setIsValidated(false)
        })
    }

    async function sendVerifyEmail() {
        await axios.get(MAIN_ADRESS + "users/" + id + "/verify")
        .then((res: any) => {
            toast.success("Un email de vérification viens d'être envoyé sur votre adresse email")
        })
        .catch((err: any) => {
        })
    }

    useEffect(() => {
        checkTokenVerifyEmail()
    }, [])

    return (
        <div className="email-vrf-bg">
            <div className="center-box">
                {isValidated ? (
                    <div className="center">
                        <div className="img-center">
                            <img className="fit-picture"
                            src="/icon-valid.png"
                            alt="Grapefruit slice atop a pile of other slices"/>
                        </div>
                        Félicitation votre email est validé !<br/>Vous pouvez quitter cette page.
                    </div>
                ) : (
                    <div className="center">
                        <div className="img-center">
                            <img className="fit-picture"
                            src="/icon-error.png"
                            alt="Grapefruit slice atop a pile of other slices"/>
                        </div>
                        Le token de vérification n'est pas bon. Cliquez <button onClick={sendVerifyEmail}>ici</button> pour recevoir un nouvel email
                    </div>
                )}
            </div>
        </div>
    )
}
