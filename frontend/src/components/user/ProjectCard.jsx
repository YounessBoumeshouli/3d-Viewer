import React from 'react';
import { Link } from 'react-router-dom';

const OfferCard = ({ id, title, image, likes }) => {
    return (
        <div className="flex flex-col bg-black rounded-3xl">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                        <h2 className="text-lg font-medium tracking-tighter text-white lg:text-3xl">
                            Corporate
                        </h2>
                        <p className="mt-2 text-sm text-gray-100">Grow steadily and pizza.</p>
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
                <a aria-describedby="tier-starter"
                   className="items-center justify-center w-full px-6 py-2.5 text-center text-black duration-200 bg-white border-2 border-white rounded-full nline-flex hover:bg-transparent hover:border-white hover:text-white focus:outline-none focus-visible:outline-white text-sm focus-visible:ring-white"
                   href="#">
                    Get started
                </a>
            </div>
        </div>
    );
};

export default OfferCard;