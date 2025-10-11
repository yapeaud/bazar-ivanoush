import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <section className='text-center'>
                <p className='text-2xl font-medium text-gray-800'>Abonnez-vous dès maintenant & bénéficiez de 20 % de réduction</p>
                <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi labore placeat veniam minima eum facilis.</p>
                <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                    <input type="email" placeholder="Entrez votre adresse email" className='w-full sm:flex-1 outline-none' required />
                    <button type="submit" className='bg-black text-white text-xs px-10 py-4'>S'ABONNER</button>
                    {/* <button type="submit" className="bg-black text-white text-xs px-10 py-4 border border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-500">S'ABONNER</button> */}
                </form>
            </section>
        </>
    )
}

export default NewsletterBox
