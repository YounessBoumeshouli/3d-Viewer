"use client"

import React, {useEffect, useState} from "react"
import Layout from "../components/admin/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.jsx"
import { Plus } from "lucide-react"
import api from "../services/api.js";
import CategoryModel from "../components/admin/CategoryModel.jsx";
import OfferModel from "../components/admin/OfferModel.jsx";

function Offers() {

    const  [OffersCategories , setOffersCategories] = useState({});
    const  [offerModel , setOfferModel] = useState({string : '',integer:null});

    const handleClick = (numberDuration, stringDuration) => {
        setOfferModel({
            integer: numberDuration,
            string: stringDuration
        });
    };
        const fetchOffers = async () => {
            console.log('is fetching')
            const response = await api.get('offersEnum');
            console.log(response.data)
            setOffersCategories(response.data);
        };
    useEffect(() => {
        fetchOffers();


    }, []);
    useEffect(() => {
if (OffersCategories){
    console.log(OffersCategories)

}
    }, [OffersCategories]);
    const closeOfferModel = () =>{
        setOfferModel(false);
    }

    const [showDialog, setShowDialog] = useState(false)
    return (
        <Layout>
            <div className="grid grid-cols-1 gap-6">
                <Card className="bg-[#242634] border-[#3e435d]/20 text-white">
                    <CardContent className="pt-10 pb-10 flex flex-col items-center text-center">
                        <h2 className="text-2xl font-bold mb-2">Add Offer</h2>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Create new project and customize it with your priority base UI kit element.
                        </p>
                        <Button className="bg-transparent hover:bg-[#3e435d]/20 border border-[#3e435d] rounded-full"
                                onClick={() => setOfferModel(true)}>
                            <Plus className="h-5 w-5 mr-2" />
                            add New Offer
                        </Button>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    { Object.entries(OffersCategories).map(([numberDuration, StringDuration]) => (
                        <div className="flex flex-col bg-black rounded-3xl" key={numberDuration}>
                            <div className="px-6 py-8 sm:p-10 sm:pb-6">
                                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                                    <div>
                                        <h2 className="text-lg font-medium tracking-tighter text-white lg:text-3xl">
                                            {StringDuration}
                                        </h2>
                                        <p className="mt-2 text-sm text-gray-100">  Description</p>
                                    </div>
                                    <div className="mt-6">
                                        <p>
                              <span className="text-5xl font-light tracking-tight text-white">
                                $35
                              </span>
                                            <span className="text-base font-medium text-white"> /mo </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex px-6 pb-8 sm:px-8">
                                <button aria-describedby="tier-starter"
                                   className="items-center justify-center w-full px-6 py-2.5 text-center text-black duration-200 bg-white border-2 border-white rounded-full nline-flex hover:bg-transparent hover:border-white hover:text-white focus:outline-none focus-visible:outline-white text-sm focus-visible:ring-white"
                                        onClick={() => handleClick(numberDuration,StringDuration)}>

                                    Edite Plan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {offerModel && (
                <OfferModel
                    onClose={
                        () => {
                            closeOfferModel();
                        }
                    }
                    offer ={offerModel}
                />
            )}
        </Layout>
    )
}

export default Offers

