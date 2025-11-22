import React from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = ({ deliveryCity = '' }) => {

    const { currency, calculateDeliveryFee, getCartAmount } = React.useContext(ShopContext);
    const deliveryFee = calculateDeliveryFee(deliveryCity);
    return (
        <>
            <section className='w-full'>
                <article className='text-2xl'>
                    <Title text1={'TOTAL'} text2={'DU PANIER'} />
                </article>

                <article className='flex flex-col gap-2 mt-2 text-sm'>
                    <div className='flex justify-between'>
                        <p>Sous-Total</p>
                        <p>{getCartAmount()}.00 {currency}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <p>Frais de livraison</p>
                        <p>{deliveryFee}.00 {currency} </p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <b>Total</b>
                        <b>{getCartAmount() + deliveryFee}.00 {currency}</b>
                    </div>

                </article>
            </section>
        </>
    )
}

export default CartTotal
