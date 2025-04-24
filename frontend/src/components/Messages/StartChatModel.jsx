"use client"
import { X , MessageSquareText} from "lucide-react"
import { Button } from "@/components/ui/button"
import React, {useEffect,useState} from "react";
import api from "./../../services/api.js";

function StartChatModel({ title = 'Start a new char', onClose }) {
    const [formData,setFormData] = useState({
        title:'',
    })
    const [searchBar , setSearchBar] = useState(null);
    const [groupName , setGroupName] = useState(null);

    const [friends , setFriends] = useState([]);
    const [selectedFriends , setSelectedFriends] = useState([]);

    const addFriend = (friend) => {
        console.log(friend)
        const friendIsExist = selectedFriends.find(f => f.friend_id === friend.id)
        console.log(friendIsExist)
        if (!friendIsExist){
            console.log(friend)
            const newFriend = { id: selectedFriends.length + 1, friend_id: friend.id , name : friend.name};
            setSelectedFriends([...selectedFriends, newFriend]);
        }else {
            console.log(selectedFriends)
            setSelectedFriends(prevState => prevState.filter(friend=>friend!==friendIsExist))
        }
    };
    useEffect(() => {
        setGroupName(selectedFriends.map((friend, i) => (
            `${friend.name}_`
        ))+`chat`)
    }, [selectedFriends]);
    useEffect(() => {
        const fetchFrinds = async () =>{
            const  response = await api.get('friends');
            setFriends(response.data);
        }
        fetchFrinds();
    }, []);

    const handleSearchChange = (e) =>{
        const {name,value} = e.target;
        setSearchBar(prev =>(
            {
                ...prev,
                [name] : value
            }
        ))
    }
    const handleGroupNameChange = (e) =>{
        setGroupName(e.target.value)
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response =  await  api.post('conversations', {
                'title': groupName,
                'participants': selectedFriends,
            },{
                headers : {"Content-Type": "multipart/form-data" }
            })
            console.log( response.data)

        }catch (error){
            console.error(error)
        }
        onClose();
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold flex items-center">
                            {title}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col justify-center">
                            <form className="space-y-4"
                                  onSubmit={handleSubmit}
                            >
                                {
                                    selectedFriends.length > 1 &&
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Name of the group chat
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name='title'
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                        placeholder="name of the group"
                                        value={groupName}
                                        onChange={handleGroupNameChange}

                                    />
                                </div>
                                }

                                <div>
                                    <h2>Selected friends</h2>
                                <ul className="divide-y divide-gray-200">
                                    {selectedFriends.length > 0 ? selectedFriends.map((friend, i) => (
                                        <li
                                            key={i} className="flex items-center gap-3 py-2">
                                            <MessageSquareText/>
                                            <span className="text-green-500">{friend.name}</span>
                                        </li>
                                    )) : (
                                        <li className="flex items-center gap-3 py-2">
                                            <span>you have to select one friend or more</span>
                                        </li>
                                    )}
                                </ul>
                                </div>



                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Sign In

                                </button>
                            </form>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search friend..."
                                onChange={handleSearchChange}
                                name = 'friendName'
                                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button className="absolute right-2 top-2.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <ul className="divide-y divide-gray-200">
                                {friends ? friends.map((friend, i) => (
                                    <li
                                        onClick={()=>addFriend(friend)}
                                        key={i} className="flex items-center gap-3 py-2">
                                         <MessageSquareText/>
                                        <span className="text-green-500">{friend.name}</span>
                                    </li>
                                )) : (
                                    <li className="flex items-center gap-3 py-2">
                                        <span>no friends yet</span>
                                    </li>
                                )}
                            </ul>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    )
}

export default StartChatModel

