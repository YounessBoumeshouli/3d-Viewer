import React from 'react';
import { ChevronDown } from 'lucide-react';

const FormField = ({ label, placeholder, dropdown = false }) => {
    return (
        <div>
            <label className="block text-gray-700 mb-2">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    className={`w-full p-3 border border-gray-200 rounded-md ${dropdown ? 'pr-10' : ''}`}
                />
                {dropdown && (
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <ChevronDown size={16} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormField;