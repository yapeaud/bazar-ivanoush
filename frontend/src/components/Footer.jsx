import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <>
            <section>
                <article className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                    <div>
                        <img src={assets.logo} alt="" className='mb-5 w-32' />
                        <p className='w- h-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <p className='text-xl font-medium mb-5'>LE BAZAR D'IVANOUSH</p>
                        <ul className='flex flex-col gap-1 text-gray-600'>
                            <li>Accueil</li>
                            <li>À propos de nous</li>
                            <li>Livraison</li>
                            <li>Politique de confidentialité</li>
                        </ul>
                    </div>

                    <div>
                        <p className='text-xl font-medium mb-5'>CONTACTEZ-NOUS</p>
                        <ul className='flex flex-col gap-1 text-gray-600'>
                            <li>Phone</li>
                            <li>Email</li>
                        </ul>
                    </div>
                </article>
                
                <article>
                    <hr />
                    <p className='py-5 text-sm text-center'>Copyright © {new Date().getFullYear()} - Tous droits réservés - Le Bazar d'ivanoush</p>
                </article>
            </section>
        </>
    )
}

export default Footer
