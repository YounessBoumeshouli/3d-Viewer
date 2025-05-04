import React from 'react';
import { Link } from 'react-router-dom';

const ModelCard = (props) => {
    console.log(props)
    const id = props.model.token
    const title = props.title
    const image = props.image
    const creator = props.creator
    const downloads = props.downloads
    const comments = props.comments
    const tags = props.tags
    console.log(props.model.id)
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <Link to={`/model/${id}`}>
                <div className="relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-3 right-3 p-1 rounded-full bg-white/70 hover:bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
            </Link>

            <div className="p-4">
                <Link to={`/model/${id}`} className="block mb-1">
                    <h3 className="font-medium text-gray-900">{title}</h3>
                </Link>

                <div className="flex items-center mb-2">
                    <Link to={`/designer/${creator.id}`} className="flex items-center">
                        <img
                            src={"dd"}
                            alt={"dd"}
                            className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-600">by {creator.name}</span>
                    </Link>
                </div>

                <div className="flex items-center text-sm text-gray-500 justify-between">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {downloads}
                    </div>

                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        {comments}
                    </div>
                </div>

                {tags && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
                {tag}
              </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModelCard;