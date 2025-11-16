import React from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React. useState('')    

    const onSubmitHandler = async (e) => {
        try {
        e.preventDefault();
        const reponse = await axios.post(backendUrl + '/api/users/admin', { email, password });

        if (reponse.data.success) {
            const { token } = reponse.data;  // ✅ Extraction du token
            if (token) {
                setToken(token);  // ✅ On sauvegarde le JWT
            } else {
                toast.error("Aucun token reçu du serveur.");
            }
        } else {
            toast.error(reponse.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};

    return (
        <>
        <main className='min-h-screen flex items-center justify-center w-full'>
            <section className='bg-white shadow-md  rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Le Bazar d'Ivanoush.</h1>
                <form onSubmit={onSubmitHandler}>
                    <article className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Adresse e-mail</p>
                        <input onChange={(e) =>setEmail(e.target.value)} value={email} type="email" placeholder='Ton@email.com' required className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' />
                    </article>
                    <article className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Mot de passe</p>
                        <input onChange={(e) =>setPassword(e.target.value)} value={password} type="password" placeholder='Entrez votre mot de passe' required className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' />
                    </article>
                    <button type="submit" className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>Connexion</button>
                </form>
            </section>
        </main>
        </>
    )
}

export default Login
