import { useState } from 'react'

const LoginPage = () => {

    const [curentState, setCurrentState] = useState('Inscription');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
    }

    return (
        <>
        <section className='flex items-center justify-center' onSubmit={onSubmitHandler}>
            <form className='flex flex-col items-center w-[90%] sm:w-96 mt-auto gap-4 text-gray-800'>
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <p className='prata-regular text-3xl'>{curentState}</p>
                    <hr className='w-8 border-none h-[1.5px] bg-gray-800' />
                </div>
                {curentState === 'Connexion' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Nom' required />}
                <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Adresse e-mail' required />
                <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Mot de passe' required />
                <div className='w-full flex justify-between text-sm mt-[-8px]'>                   
                    <p className='cursor-pointer'>Mot de passe oublié?</p>
                    {
                        curentState === 'Connexion' 
                        ? <p className='cursor-pointer' onClick={() => setCurrentState('Inscription')}>Créer un compte</p>
                        :<p className='cursor-pointer' onClick={() => setCurrentState('Connexion')}> Connectez-vous ici</p>
                    }
                </div>
                <button type="submit" className='bg-black text-white font-light px-8 py-2 mt-4'>{curentState === 'Connexion' ? 'Se connecter' : 'S\'inscrire'}</button>
            </form>
        </section>
            
        </>
    )
}

export default LoginPage
