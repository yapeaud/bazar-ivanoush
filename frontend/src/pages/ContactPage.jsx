import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const ContactPage = () => {
    return (
        <>
            <section>
                <article className='text-2xl text-center pt-10 border-t '>
                    <Title text1='CONTACTEZ -'text2='NOUS' className='' />
                </article>

                <article className='flex flex-col my-10 justify-center md:flex-row gap-10 mb-28'>
                    <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]' />
                    <div className='flex flex-col justify-center items-start gap-6'>
                        <p className='font-semibold text-xl text-gray-600'>Notre Boutique</p>
                        <p className='text-gray-500'>Carrefour 3 Palmiers <br /></p>
                        <p className='text-gray-500'>Tel: (225) 00 00 00 00 00 <br /> Email: example@gmail.com</p>
                        {/* <p></p>
                        <p></p> */}
                    </div>
                </article>
                <NewsletterBox />
            </section>
        </>
    )
}

export default ContactPage
