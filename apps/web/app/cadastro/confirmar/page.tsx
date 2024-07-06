"use client"

import { useEffect, useState } from "react";
import { Footer } from "../../../components";

export default function ConfirmarPage(): JSX.Element {
    const [email, setEmail] = useState<string>()

    useEffect(() => {
        const email = localStorage.getItem('tabnews.auth.registration-email')
        localStorage.removeItem('tabnews.auth.registration-email')

        if (email) {
            setEmail(email)
        }
    }, [])

    return (
        <main className="gap-10 text-center flex flex-col justify-center items-center py-36">
            <section className="w-[60vw] space-y-2">
                <h1 className="text-3xl font-medium">Confira seu e-mail: {email}</h1>
                <p>Você receberá um link para confirmar seu cadastro e ativar a sua conta.</p>
            </section>
            
            <Footer className="w-[60vw]"/>
        </main>
    )   
}