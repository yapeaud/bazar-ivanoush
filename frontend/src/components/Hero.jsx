import { assets } from '../assets/assets'

const Hero = () => {
    return (
        <>
            <section className='flex flex-col sm:flex-row border border-gray-400'>
                {/* Hero Côté Gauche */}
                <aside className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                    <article className='text-[#414141]'>
                        <div className='flex items-center gap-2'>
                            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                            <p className='font-medium text-sm md:text-base'>NOS MEILLEURES VENTES</p>
                        </div>
                        <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Dernières Arrivées</h1>
                        <div className='flex items-center gap-2'>
                            <p className='font-medium text-sm md:text-base'>ACHETER MAINTENANT</p>
                            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        </div>
                    </article>
                </aside> 

                {/* Hero Côte Droite */}
                <img src={assets.hero_img} alt="" className='w-full sm:w-1/2'/>
            </section>
        </>
    )
}

export default Hero 