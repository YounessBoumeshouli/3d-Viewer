import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ id, title, image, likes }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <Link to={`/project/${id}`}>
                <div className="relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-3 left-3 flex items-center bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {likes}
                    </div>
                </div>
            </Link>

            <div className="p-3">
                <Link to={`/project/${id}`}>
                    <h3 className="font-medium text-gray-900">{title}</h3>
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;