import React, {useEffect,useState} from 'react';
import {Link, useSearchParams } from 'react-router-dom';
import Layout from '../components/user/Layout';
import Success from "../components/payment/Success.jsx";
import { useNavigate} from 'react-router-dom';
import api from '../services/api.js'
const PaymentSuccess = () => {
const [searchParam] = useSearchParams ();
const Navigate = useNavigate();
const token = searchParam.get('token');
const order_id = searchParam.get('order_id');
    const [processing, setProcessing] = useState(false);

    const handleSuccess = async ()=>{
        if (processing) return;
        setProcessing(true);
        let response ;
        if (!token){
            console.log('there is no token ');
         response = await api.post('/designers');
        }else {
            console.log('there is a token ');

            response = await api.post('/payment/success',{
            order_id:parseInt(order_id),
            token:token
        });
        }
        console.log(response.data)
        if (response.data.status === 'success') {

                Navigate('/SettingsPage');

        } else {
            throw new Error('Payment verification failed');
        }
    }
    useEffect( () => {
        handleSuccess();
    }, []);
    return (
        <Layout>
        <Success/>
        </Layout>
    );
};

export default PaymentSuccess;