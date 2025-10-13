import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const ContactPage = () => {
    return (
        <>
            <section>
                <article className='text-2xl text-center pt-10 border-t '>
                    <Title text1='CONTACTEZ -' text2='NOUS' className='' />
                </article>

                <article className='flex flex-col my-10 justify-center md:flex-row gap-10 mb-28'>
                    <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]' />
                    <div className='flex flex-col justify-center items-start gap-6'>
                        <p className='font-semibold text-xl text-gray-600'>Notre Boutique</p>
                        <p className='text-gray-500'>Tel: (225) 05 85 51 28 51 <br /> Email: lebazardivanoush@gmail.com</p>
                        <p className='text-gray-500'>Facebook:{" "}<a href="https://web.facebook.com/profile.php?id=100075942410802">IVA MODE</a>{" "}<br />WhatsApp:{" "}<a href="https://wa.me/message/DO7Q3I4IETRXA1">05 85 51 28 51</a>.</p>
                    </div>
                </article>
                <NewsletterBox />
            </section>
        </>
    )
}

export default ContactPage
