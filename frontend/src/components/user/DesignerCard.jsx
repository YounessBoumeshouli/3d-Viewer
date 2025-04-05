import React from 'react';
import { Link } from 'react-router-dom';

const DesignerCard = (props) => {

    const designer =  props.designer
    const links = designer.social_links
    const avatar = designer.avatar
    const name = designer.user.name
    const role =  designer.user.role
    const id = designer.id
    console.log(designer)
    return (

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Link to={`/designer/${id}`}>
                <img
                    src={avatar}
                    alt={name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />

                <h3 className="font-medium text-lg">{name}</h3>
                <p className="text-gray-600 text-sm mb-4">{role}</p>
            </Link>

            <div className="flex justify-center space-x-3">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        className="text-gray-600 hover:text-gray-900"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.icon}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default DesignerCard;