import { useState,useEffect, useRef } from "react";
import axios from "axios";
import Profile from '../assets/profile.jpg';
import dayjs from "dayjs";
function Chats (props){
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [submitting, setIsSubmitting] = useState(false);




  useEffect(() => {
    const fetchChats = async (Initial) => {

      try {
        const res = await axios.get('https://mern-yap-backend.onrender.com/api/chats');
        setChats(res.data.data.reverse());
      } catch (err) {
        console.error('Error fetching rants:', err.message);
      } 
    };

    fetchChats(true); 

    const interval = setInterval(() => {
      fetchChats(false); 
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addChat = async ()=>{
    if (message === '') {
      alert('Put Some Message');
      return;
    }
    if (submitting) return;

    const newChat = {
      name: "Anonymous Yapper",
      message,
      date: dayjs().format('dddd, MMMM, D'),
      time: dayjs().format('hh:mm A')
    };

    try {
      await axios.post('https://mern-yap-backend.onrender.com/api/chats', newChat);

    } catch (error) {
      console.error("Error posting rant:", err.message);

    }
    setMessage('');


  }


  return (
    <>
      <div
        className={`${
          props.chats ? 'fixed' : 'hidden'
        } bottom-0 right-4 bg-gray-800/90 font-poppins w-[300px] h-[400px] rounded-t-lg shadow-lg flex flex-col`}
      >
        {/* Header */}
        <div className="bg-gray-900 px-4 py-2 flex justify-between items-center text-white rounded-t-lg">
          <p className="font-semibold">Chats</p>
          <button
            onClick={() => props.hideChat()}
            className="text-sm hover:text-red-400"
          >
            ✕
          </button>
        </div>
  
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-700 px-3 py-3 space-y-4 text-sm text-white rounded-b-lg flex flex-col-reverse">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className="font-poppins bg-gray-800/90 p-3 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={Profile}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-500"
                />
                <div className="flex flex-col">
                  <p className="text-white font-semibold">{chat.name}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-justify leading-relaxed break-words">
                {chat.message}
              </p>
            </div>
          ))}
        </div>

  
        {/* Chat Input */}
        <div className="bg-gray-800 p-2 flex gap-2 items-center">
        <textarea
          placeholder="Type a message..."
          className="flex-1 px-3 py-1 rounded bg-gray-900 text-white focus:outline-none text-sm resize-none overflow-auto"
          rows="2"
          onChange={(e)=>{setMessage(e.target.value)}}
          value={message}
        />

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={()=>{addChat()}}>
            Send
          </button>
        </div>
      </div>
    </>
  );
  


}

export default Chats;