import React from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = () => {

    const [currentState, setCurrentState] = React.useState('Connexion');
    const {token, setToken, navigate, backendUrl} = React.useContext(ShopContext);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
         //console.log({name, email, password}); // Vérifier les données envoyées
        try {
            if (currentState === 'Inscription') {
                const response = await axios.post(backendUrl + '/api/users/register', {name, email, password})
                if(response.data.success){
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                } else {
                    toast.error(response.data.message);
                }
                
            } else {
                const response = await axios.post(backendUrl + '/api/users/login', {email, password})
                if(response.data.success){
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            // console.error(error);
            // toast.error(error.message);
            console.error("Erreur détaillée:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    React.useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <>
            <section className='flex items-center justify-center'>
                <form className='flex flex-col items-center w-[90%] sm:w-96 mt-auto gap-4 text-gray-800'  onSubmit={onSubmitHandler}>
                    <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                        <p className='prata-regular text-3xl'>{currentState}</p>
                        <hr className='w-8 border-none h-[1.5px] bg-gray-800' />
                    </div>
                    {currentState === 'Connexion' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Nom' required />}
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Adresse e-mail' required />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Mot de passe' required />
                    <div className='w-full flex justify-between text-sm mt-[-8px]'>
                        <p className='cursor-pointer'>Mot de passe oublié?</p>
                        {
                            currentState === 'Connexion'
                                ? <p className='cursor-pointer' onClick={() => setCurrentState('Inscription')}>Créer un compte</p>
                                : <p className='cursor-pointer' onClick={() => setCurrentState('Connexion')}> Connectez-vous ici</p>
                        }
                    </div>
                    <button type="submit" className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Connexion' ? 'Se connecter' : 'S\'inscrire'}</button>
                </form>
            </section>

        </>
    )
}

export default LoginPage
