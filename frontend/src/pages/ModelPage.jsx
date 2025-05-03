import React, { useEffect,useRef, useState } from 'react';
import Layout from '../components/user/Layout';
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import House from "../pages/house.jsx";

const ModelPage = () => {
    const [model, setModel] = useState(null);
    const [stars, setStars] = useState(null);
    const [rating, setRating] = useState(null);
    const [likes, setLikes] = useState(null);
    const [myreaction, setMyReaction] = useState(false);
    const [ratingCount, setRatingCount] = useState(null);
    const [replyForm, setReplyForm] = useState(null);
    const [replyFormdata, setReplyFormData] = useState({
        reply: ''
    });
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(null);
    const { id } = useParams();
    const [formData, setFromData] = useState({
        comment: '',
        house_id: id
    });
    const LikeButton = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const  fetchUserRating = async ()=>{

        const response = await  api.get(`models/${id}/myRate`);
        console.log(response.data)
        setStars(response.data.stars)
        fillStars(stars);
    }

    const  fetchRating = async ()=>{

        const response = await  api.get(`models/${id}/rating`);
        console.log(response.data)
        setRating(response.data.sum)
        setRatingCount(response.data.count)


    }
    const  fetchLikes = async ()=>{

        const response = await  api.get(`models/${id}/likes`);
        console.log(response.data)
        setLikes(response.data)
    }
    const  fetchIsLiked = async ()=>{

        const response = await  api.get(`models/${id}/myReaction`);
        console.log(response.data)
        setMyReaction(response.data)
        await fetchLikes();
    }
    useEffect(() => {
        fetchIsLiked();
        fetchLikes();
    }, []);
    const  handlePressLike = async ()=>{

        const response = await  api.put(`models/${id}/likes`);
        console.log(response.data)
        response.data.status ==='liked' ? setMyReaction(true) : setMyReaction(false);
       await fetchLikes()
    }
    const clearStars =()=>{
        for (let i = 5 ; i >= 1 ; i --){
            document.getElementById(`star-${i}`).classList.remove('text-yellow-400');
        }
    }
    const fillStars = (stars)=>{
        console.log("sala",stars)
        clearStars();
        for (let i = stars ; i >= 1 ; i --){
            document.getElementById(`star-${i}`).classList.add('text-yellow-400');
        }
    }
    useEffect(() => {
        fetchRating();
        fetchUserRating();
        console.log(ratingCount)

    }, [stars]);
    const handleReplyChange = (e) => {
        const { name, value } = e.target;
        setReplyFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData || formData['comment'] == null) {
            console.error('you should fill the comment field');
        } else {
            try {
                const response = await api.post(`house/${id}/comments`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setComment(response.data);
            } catch (e) {
                console.error("error while posting data", e);
            }
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyFormdata || replyFormdata['reply'] == null) {
            console.error('you should fill the reply field');
        } else {
            try {
                const response = await api.post(`comments/${replyForm}/replies`, replyFormdata, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setReplyForm(false);
            } catch (e) {
                console.error("error while posting data", e);
            }
        }
    };

    const fetchModel = async () => {
        try {
            const response = await api.get(`houses/${id}`);
            setModel(response.data);
        } catch(error) {
            console.error("Error fetching model:", error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await api.get(`house/${id}/comments`);
            setComments(response.data.comments);
            console.log(response.data.comments)
        } catch(error) {
            console.error("Error fetching comments:", error);
        }
    };
    let likeClassName = " bg-gray-900/80 hover:bg-white transition-colors text-white hover:text-red-900 p-2.5 rounded-full shadow-lg backdrop-blur-sm";
    useEffect(() => {
        fetchComments();
        console.log(comments)
    }, [comment]);

    useEffect(() => {
        fetchModel();
    }, []);

    useEffect(() => {
            if (LikeButton.current){
                if (myreaction){
                    console.log("like");
                    likeClassName  =  " hover:bg-gray-900/80 bg-white transition-colors hover:text-white text-red-900 p-2.5 rounded-full shadow-lg backdrop-blur-sm";
                }else {
                    console.log('none');
                    likeClassName = "bg-gray-900/80 hover:bg-white transition-colors text-white hover:text-red-900 p-2.5 rounded-full shadow-lg backdrop-blur-sm";
                }
                LikeButton.current.className = likeClassName;
            }
        }, [myreaction]);

    const handleHover = (star)=> {
        for (let i = star ; i >= 1 ; i --){
            document.getElementById(`star-${i}`).classList.toggle('text-yellow-400');
        }
    }
    const handleRating = async (star)=> {
       const response = await  api.put(`models/${id}/rating`,{
            stars : star
        })
        fetchUserRating();
    }

    return (
        <Layout>
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Main content area */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left side - viewer */}
                        <div className="w-full lg:w-2/3">
                            {model && (
                                <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 relative h-[600px] overflow-hidden">
                                    <House file={model.dxf_file.path} components={model.components} height={model.stage} />

                                    <div className="absolute top-4  right-4 flex gap-2">
                                        <button ref={LikeButton}
                                                className={likeClassName}
                                                onClick={()=>handlePressLike()}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                        <button className="bg-gray-900/80 hover:bg-white transition-colors text-white hover:text-black p-2.5 rounded-full shadow-lg backdrop-blur-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4 flex justify-center">
                                        <div className="flex space-x-4">
                                            <button className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-full p-3 shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-full p-3 shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </button>
                                            <button className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-full p-3 shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full lg:w-1/3 space-y-6">
                            {model && (
                                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg">
                                    <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                        {model.dxf_file.name || "Modern House Design"}
                                    </h2>

                                    <div className="flex justify-between mb-3">
                                        <p className="text-gray-300 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                            </svg>
                                            200×150×180 cm
                                        </p>
                                        <p className="text-gray-300 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {model.dxf_file.designer?.name || "Unknown Designer"}
                                        </p>
                                    </div>

                                    <p className="text-gray-300 mb-4">
                                        A modern house design featuring minimalist architecture with open spaces and natural light integration.
                                    </p>
                                    <p className="">{likes} Likes</p>


                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button id={`star-${star}`} onMouseEnter={()=> {
                                                        clearStars();
                                                        handleHover(star)
                                                    }} onMouseLeave={()=> {
                                                        handleHover(star);
                                                        fillStars(stars)
                                                    }} onClick={()=>handleRating(star)}>

                                                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>
                                            {ratingCount !== 0 ? (<span
                                                className="ml-2 text-gray-300">{rating/ratingCount}/5 ({ratingCount} ratings)</span>):(
                                                <span
                                                    className="ml-2 text-gray-300"> (there in no rating yet)</span>
                                            )}
                                        </div>

                                        <button className="text-xs bg-blue-600 hover:bg-blue-700 transition-colors py-1 px-3 rounded-full">
                                            Download
                                        </button>

                                    </div>
                                </div>
                            )}


                            {/* Share panel */}
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Share</h3>
                                <div className="grid grid-cols-4 gap-2">

                                    <button className="bg-blue-600 hover:bg-blue-700 transition-colors p-2.5 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </button>
                                    <button className="bg-pink-600 hover:bg-pink-700 transition-colors p-2.5 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </button>
                                    <button className="bg-red-600 hover:bg-red-700 transition-colors p-2.5 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                        </svg>
                                    </button>
                                    <button
                                        className="group relative flex items-center font-inherit text-xl bg-blue-600 text-white py-3 px-4 pl-2 border-none rounded-2xl overflow-hidden transition-all duration-200 ease-in-out cursor-pointer hover:scale-100 active:scale-95">
                                        <div className="group-hover:animate-fly">
                                            <div className="svg-wrapper">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                     height="24"
                                                     className="transform transition-transform duration-300 ease-in-out origin-center group-hover:translate-x-5 group-hover:rotate-45 group-hover:scale-110">
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                    <path fill="currentColor"
                                                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <span
                                            className="block ml-1 transition-transform duration-300 ease-in-out text-sm group-hover:translate-x-20">Send</span>
                                    </button>
                                </div>
                                <div className="mt-4 relative">
                                    <input
                                        type="text"
                                        value="https://example.com/model/12345"
                                        readOnly
                                        className="bg-gray-700 text-gray-300 rounded-lg px-4 py-2 w-full pr-12 border border-gray-600 focus:border-blue-500 focus:outline-none"
                                    />
                                    <button
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                                        </svg>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments section */}
                    <div
                        className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Comments</h3>
                            <div
                                className="bg-gray-700 text-white rounded-lg px-4 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-gray-600 transition-colors">
                                <span>Newest First</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="bg-gray-700 text-white rounded-lg px-4 py-3 w-full border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                                        name='comment'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type='submit' className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-2 rounded-lg font-medium">Post Comment</button>
                            </div>
                        </form>

                        {/* Comments list */}
                        <div className="space-y-6">
                            {comments && comments.map((comment) => (

                                <div key={comment.id} className="bg-gray-700/40 rounded-xl p-5 border border-gray-700">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{comment.user?.name || "Anonymous User"}</h4>
                                                <p className="text-sm text-gray-400">{new Date(comment.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>


                                        <button className="text-gray-400 hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <p className="text-gray-300 mb-4">{comment.content}</p>

                                    <div className="flex items-center gap-4 mb-4">
                                        <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                            </svg>
                                            <span>{comment.likes || 0}</span>
                                        </button>
                                        <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10V5a2 2 0 012-2h.095c.5 0 .905.405.905.905 0 .714.211 1.412.608 2.006L11 11v9m-4 0h10a2 2 0 002-2v-6a2 2 0 00-2-2h-2.5" />
                                            </svg>
                                            <span>{comment.dislikes || 0}</span>
                                        </button>
                                        <button
                                            onClick={() => setReplyForm(comment.id)}
                                            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                            </svg>
                                            <span>Reply</span>
                                        </button>
                                    </div>

                                    {replyForm === comment.id && (
                                        <form onSubmit={handleReplySubmit} className="ml-12 mb-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        placeholder="Write a reply..."
                                                        className="bg-gray-700 text-white rounded-lg px-3 py-2 w-full border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors text-sm"
                                                        name="reply"
                                                        onChange={handleReplyChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setReplyForm(null)}
                                                    className="text-gray-400 hover:text-white transition-colors px-4 py-1.5 rounded-lg text-sm"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-1.5 rounded-lg text-sm font-medium"
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {/* Replies list */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="ml-12 space-y-4 mt-4">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="bg-gray-700/20 rounded-lg p-4 border border-gray-700">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h5 className="font-medium text-sm">{reply.user?.name || "Anonymous User"}</h5>
                                                            <p className="text-xs text-gray-400">{new Date(reply.created_at).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-300 text-sm ml-11">{reply.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ModelPage;