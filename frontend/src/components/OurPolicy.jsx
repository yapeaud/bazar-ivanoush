import { assets } from '../assets/assets'

const OurPolicy = () => {
    return (
        <>
            <section className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
                <article>
                    <img src={assets.exchange_icon} alt="" className='w-12 mb-5 m-auto' />
                    <p className='font-semibold'>Règles d'échange sans complications</p>
                    <p className='text-gray-400'>Nous mettons à votre disposition une procédure d'échange aisée et sans souci.</p>
                </article>
                <article>
                    <img src={assets.quality_icon} alt="" className='w-12 mb-5 m-auto' />
                    <p className='font-semibold'>Retour possible sous 3 jours.</p>
                    <p className='text-gray-400'>Vous disposez de 3 jours pour retourner votre achat.</p>
                </article>
                <article>
                    <img src={assets.support_img} alt="" className='w-12 mb-5 m-auto' />
                    <p className='font-semibold'>Meilleur service client</p>
                    <p className='text-gray-400'>Nous offrons un meilleur service client 24/7.</p>
                </article>
            </section>
        </>
    )
}

export default OurPolicy
