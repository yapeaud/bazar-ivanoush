import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const AboutPage = () => {
    return (
        <>
            <section>
                <article className='text-2xl text-center pt-8 border-t'>
                    <Title text1='À PROPOS' text2='DE NOUS' />
                </article>

                <article className='my-10 flex flex-col md:flex-row gap-16'>
                    <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]' />
                    <div className='flex flex-col gap-6 justify-center md:w-2/4 text-gray-600'>
                        <p>Nous sommes plus qu'une simple friperie, nous sommes la caverne d'autres articles diverse.</p>
                        <p>Au cœur du Bazar d'Ivanoush, se trouve la qualité. Nous sélectionnons avec le plus grand soin nos articles, en ne proposant que du "friperie 1er choix". Cela signifie des vêtements (notamment nos chemises) et accessoires en excellent état, sans défauts majeurs, prêts à commencer une nouvelle vie dans votre dressing.</p>
                        <b className='text-gray-800'>Notre Mission</b>
                        <p>Vous offrir des trésors à prix doux, tout en promouvant une consommation plus responsable.</p>
                    </div>
                </article>

                <article className='text-xl py-4'>
                    <Title text1='POURQUOI' text2='NOUS CHOISIR ?' />
                </article>

                <article className='flex flex-col md:flex-row text-sm mb-20'>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Qualité & Accessibilité :</b>
                        <p className='text-gray-600'>Rendre la mode et les objets de qualité accessibles à tous grâce à la seconde main "1er choix".</p>
                    </div>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Mode Responsable : </b>
                        <p className='text-gray-600'>Participer activement à l'économie circulaire en donnant une seconde vie aux produits, en plus a moindre coût </p>
                    </div>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Découverte & Plaisir :</b>
                        <p className='text-gray-600'>Être un lieu de découverte constant, où l'on chine avec plaisir la pièce rare qui apportera une touche d'originalité à votre quotidien.</p>
                    </div>
                </article>

                <NewsletterBox />
            </section>
        </>
    )
}

export default AboutPage