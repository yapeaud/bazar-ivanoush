import { assets } from '../assets/assets'

const OurPolicy = () => {
    return (
        <>
            <section className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
                <article>
                    <img src={assets.exchange_icon} alt="" className='w-12 mb-5 m-auto' />
                    <p className='font-semibold'>Politique d'échange facile</p>
                    <p className='text-gray-400'>Nous offrons une politique d'échange facile sans tracas.</p>
                </article>
                <article>
                    <img src={assets.quality_icon} alt="" className='w-12 mb-5 m-auto' />
                    <p className='font-semibold'>Politique de retour sous 7 jours</p>
                    <p className='text-gray-400'>Nous offrons une politique de retour sous 7 jours.</p>
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
