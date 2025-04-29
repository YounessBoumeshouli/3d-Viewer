import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import api from '../../services/api.js'
import {useNavigate,useLocation} from "react-router-dom";
const OfferCard = ({offer}) => {
    const handlePayment =async (id) =>{
        sessionStorage.setItem('offer_id', id);

        const response = await api.post(`/offers/${id}/paypal`);
        if (response.data && response.data.status === 'success') {
            window.location.href = response.data.redirect_url;
        } else {
            throw new Error('Failed to initialize payment');
        }
    }

    const handleSuccess = async ()=>{
        const response = await api.post('/payment/success');

        if (response.data && response.data.status === 'success') {
            setTimeout(() => {
                navigate('/client/orders?payment=success&order_id=' + orderId);
            }, 3000);
        } else {
            throw new Error('Payment verification failed');
        }
    }
    return (
        <div className="flex flex-col bg-black rounded-3xl group relative overflow-hidden">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                        <h2 className="text-lg font-medium tracking-tighter text-white lg:text-3xl">
                            {offer.title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-100">{offer.description}</p>
                    </div>
                    <div className="mt-6">
                        <p>
                              <span className="text-5xl font-light tracking-tight text-white">
                                ${offer.price}
                              </span>
                            <span className="text-base font-medium text-white"> /mo </span>
                        </p>
                    </div>
                </div>
            </div>


            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                <h3 className="text-2xl font-bold mb-2">{offer.type}</h3>
                <div className="text-sm space-y-2">
                    {offer.description}
                </div>
                <div className="flex px-6 mt-8 sm:px-8">
                    <button
                        onClick={()=>handlePayment(offer.id)}
                        className="items-center justify-center w-full px-6 py-2.5 text-center text-black duration-200 bg-white border-2 border-white rounded-full inline-flex hover:bg-transparent hover:border-white hover:text-white focus:outline-none focus-visible:outline-white text-sm focus-visible:ring-white"
                    >
                        Get started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
