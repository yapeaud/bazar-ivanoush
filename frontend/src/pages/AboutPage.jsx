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
                        <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                        <p>
Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                        <b className='text-gray-800'>Notre Mission</b>
                        <p>

Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                    </div>
                </article>

                <article className='text-xl py-4'>
                    <Title text1='POURQUOI' text2='NOUS CHOISIR ?' />
                </article>

                <article className='flex flex-col md:flex-row text-sm mb-20'>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Qualité et Qualité:</b>
                        <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
                    </div>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Commodité et Accessibilité:</b>
                        <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                    </div>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Exceptional Customer Service:</b>
                        <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
                    </div>
                </article>

                <NewsletterBox />
            </section>
        </>
    )
}

export default AboutPage