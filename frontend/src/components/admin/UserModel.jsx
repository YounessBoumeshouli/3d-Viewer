import { useState } from 'react';
import { User, Star, Award, HardDrive, Box, Layers, Calendar, CheckCircle, X, Globe, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function UserModel({creator,onClose}) {
console.log(creator)
    const [activeTab, setActiveTab] = useState('profile');

    // Calculate remaining subscription days
    const endDate = new Date(creator.useroffer.end_date);
    const today = new Date();
    const remainingDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    // Calculate storage usage percentage
    const storageUsagePercent = (parseFloat(creator.storage_size) / creator.useroffer.offer.storage) * 100;

    // Calculate model usage
    const modelsCreated = creator.houses.length;
    const modelsLimit = creator.useroffer.offer.models;
    const modelsUsagePercent = (modelsCreated / modelsLimit) * 100;

    return (
            <div key={creator.id} className=" fixed absolute top-4 left-100 inset-0 z-50 w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="relative">
                    {/* Banner image */}

                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="absolute top-4 left-4 bg-white  w-6 h-6 rounded-full shadow flex items-center text-sm">
                        <button onClick={onClose} className="text-gray-500 z-10 w-4 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    {/* Avatar */}
                    <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                        <div className="h-24 w-24 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-gray-600">
                            {creator.avatar ? (
                                <img
                                    src={creator.avatar}
                                    alt={creator.user.name}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <User size={48} />
                            )}
                        </div>
                    </div>

                    {/* Subscription badge */}
                    <div className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full shadow flex items-center text-sm">
                        <Award className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">{creator.useroffer.offer.title}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-16 px-8 pb-8">
                    {/* Creator Info */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{creator.user.name}</h1>
                            <div className="flex items-center mt-1 text-gray-600">
                                <User className="h-4 w-4 mr-1" />
                                <span className="text-sm">{creator.user.email}</span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-5 w-5 ${parseFloat(creator.avg_rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">{creator.avg_rating} / 5.0</span>
                            </div>
                        </div>

                        {/* Subscription info */}
                        <div className="flex flex-col items-end">
                            <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium flex items-center">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {creator.useroffer.paymentStatus === "paid" ? "Subscription Active" : "Free Plan"}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">{remainingDays}</span> days remaining
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mt-4 text-gray-600">
                        <p>{creator.bio || "No bio available"}</p>
                    </div>

                    {/* Tabs */}
                    <div className="mt-6 border-b border-gray-200">
                        <div className="flex space-x-8">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`py-2 px-1 font-medium text-sm ${
                                    activeTab === 'profile'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('models')}
                                className={`py-2 px-1 font-medium text-sm ${
                                    activeTab === 'models'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                3D Models
                            </button>
                            <button
                                onClick={() => setActiveTab('subscription')}
                                className={`py-2 px-1 font-medium text-sm ${
                                    activeTab === 'subscription'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Subscription
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-6">
                        {activeTab === 'profile' && (
                            <div className="space-y-4">
                                {/* Storage Usage */}
                                <div>
                                    <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <HardDrive className="h-4 w-4 mr-1" /> Storage Usage
                    </span>
                                        <span className="text-sm text-gray-600">
                      {parseFloat(creator.storage_size).toFixed(2)} MB / {creator.useroffer.offer.storage} MB
                    </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${Math.min(storageUsagePercent, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Models Usage */}
                                <div>
                                    <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <Box className="h-4 w-4 mr-1" /> Models Created
                    </span>
                                        <span className="text-sm text-gray-600">
                      {modelsCreated} / {modelsLimit}
                    </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full"
                                            style={{ width: `${Math.min(modelsUsagePercent, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="pt-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Social Links</h3>
                                    {creator.social_links && creator.social_links.length > 0 ? (
                                        <div className="flex space-x-3">
                                            {creator.social_links.map((link, index) => (
                                                <a
                                                    key={index}
                                                    href={link.url}
                                                    className="text-gray-600 hover:text-blue-600"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {link.type === 'twitter' && <Twitter className="h-5 w-5" />}
                                                    {link.type === 'instagram' && <Instagram className="h-5 w-5" />}
                                                    {link.type === 'linkedin' && <Linkedin className="h-5 w-5" />}
                                                    {link.type === 'website' && <Globe className="h-5 w-5" />}
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">No social links added</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'models' && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                    <Layers className="h-4 w-4 mr-1" /> Published 3D Models
                                </h3>

                                {creator.houses && creator.houses.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
                                        {creator.houses.map((house) => (
                                            <div key={house.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                                <div className="h-32 bg-gray-200 flex items-center justify-center">
                                                    {house.thumbnail ? (
                                                        <img
                                                            src="/api/placeholder/200/120"
                                                            alt="3D Model"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Box className="h-12 w-12 text-gray-400" />
                                                    )}
                                                </div>
                                                <div className="p-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Model #{house.id}</span>
                                                        <div className="flex items-center">
                                                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                            <span className="text-xs ml-1">
                                {house.ratings && house.ratings.length > 0
                                    ? (house.ratings.reduce((sum, r) => sum + r.stars, 0) / house.ratings.length).toFixed(1)
                                    : 'No ratings'}
                              </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No 3D models published yet</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'subscription' && (
                            <div className="space-y-4 overflow-y-auto">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-gray-800">{creator.useroffer.offer.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{creator.useroffer.offer.description}</p>
                                        </div>
                                        <div className="text-xl font-bold text-blue-600">${creator.useroffer.offer.price}</div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                            <div className="text-sm">
                                                <div className="font-medium">Expiry Date</div>
                                                <div className="text-gray-600">{new Date(creator.useroffer.end_date).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Box className="h-4 w-4 text-gray-500 mr-2" />
                                            <div className="text-sm">
                                                <div className="font-medium">Models Limit</div>
                                                <div className="text-gray-600">{creator.useroffer.offer.models}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <HardDrive className="h-4 w-4 text-gray-500 mr-2" />
                                            <div className="text-sm">
                                                <div className="font-medium">Storage Limit</div>
                                                <div className="text-gray-600">{creator.useroffer.offer.storage} MB</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            <div className="text-sm">
                                                <div className="font-medium">Status</div>
                                                <div className="text-green-600">{creator.useroffer.paymentStatus === "paid" ? "Active" : "Inactive"}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-medium text-gray-800 mb-2">Subscription Benefits</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-600">Access to create up to {creator.useroffer.offer.models} 3D models</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-600">{creator.useroffer.offer.storage} MB of storage space</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-600">Full access to component library</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-600">Priority customer support</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

    );
}