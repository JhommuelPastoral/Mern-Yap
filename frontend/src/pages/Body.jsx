import Profile from '../assets/profile.jpg';
import dayjs from "dayjs";
import axios from 'axios';
import { useState,useEffect } from 'react';
import Addrant from '../components/AddRant.jsx';
import EditRant from '../components/EditRant.jsx';
import DeleteYap from '../components/DeleteRant.jsx';


function Body(){
  const [rants, setRants] = useState([]);

  const [addRant, showAddRant] = useState(false);
  const [refresh, setRefresh] = useState(false); 

  const [editRant, showEditRant] = useState(false);
  const [id, setId] = useState ('');
  const [message, setMessage] = useState('');

  const [deleteRant, showDeleteRant] = useState(false);

  
  useEffect(() => {
    const fetchRants = async () => {
      try {
        const res = await axios.get('https://mern-yap-backend.onrender.com/api/rants');
        setRants(res.data.data.reverse());
      } catch (err) {
        console.error('Error fetching rants:', err.message);
      }
    };
  
    fetchRants(); // initial fetch
    const interval = setInterval(fetchRants, 5000); // every 5 seconds
  
    return () => clearInterval(interval); // clean up on unmount
  }, []);
  

  return(
    <main className="md:hidden mx-[10px] font-poppins mt-[10px] max-w-[1100px] pb-[50px] flex flex-col gap-[10px]  ">
      <div  className="flex justify-start gap-[10px] items-center p-[5px] rounded-full mb-[10px] bg-gray-800/80">
        <img src={Profile} className="w-[40px] h-[40px] rounded-full object-center object-cover" />
        <input onClick={() =>{showAddRant(true)}} type="text" readOnly className="border border-white w-[calc(100%)] rounded-full py-[5px] px-[10px] text-gray-400" placeholder="Whats on your mind Yapper?" />
      </div>
      <Addrant
        addRant = {addRant}
        showAddRant = { () =>{showAddRant(false)}}
        refresh={() => setRefresh(!refresh)}  
      />
      <div className="flex flex-col gap-[10px]">
        <div className="font-poppins bg-gray-800/80 p-[10px] rounded-xl ">
          <p className="text-white font-semibold flex items-center gap-[10px]"> Anonymous Yapper <span className="text-green-500 text-lg "> &middot;</span> </p>
          <p className="text-gray-400"> {dayjs().format('dddd, MMMM, D')}</p>
          <p className="text-white  text-balance text-justify"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima alias sunt tempore ab recusandae ex earum aut accusamus soluta ea, voluptatum pariatur itaque dolor omnis corrupti voluptatem assumenda. Nemo, blanditiis!</p>
        </div>
      </div>

      {rants.map((data) => (
        <div className="font-poppins bg-gray-800/80 p-[10px] rounded-xl " key={data._id}>
          <div className="flex justify-between items-center ">
            <div className="flex justify-center items-center gap-[10px]">
              <img src={Profile} className="w-[40px] h-[40px] rounded-full object-center object-cover" />
              <p className="text-white font-semibold flex items-center gap-[2px]"> {data.name} <span className="text-green-500 text-lg "> &middot;</span> </p>
            </div>
            
            <div className="flex gap-[10px]">
              <button className="text-white cursor-pointer " onClick={()=>{setId(data._id); setMessage(data.rant); showEditRant(true)}}>Edit</button>
              <button className="text-white cursor-pointer" onClick={()=>{showDeleteRant(true); setId(data._id); }}>Delete</button>
            </div>
          
          </div>
          <p className="text-gray-400 mt-[10px]"> {data.date}, {data.time}</p>
          <p className="text-gray-300 text-balance text-justify break-all">
            {data.rant}
          </p>
        </div>
      ))}

      <EditRant
        editRant = {editRant}
        showEditRant = { () =>{showEditRant(false)}}
        refresh = {() => setRefresh(!refresh)}  
        message = {message}
        id = {id}
      />
      <DeleteYap   
        deleteRant = {deleteRant}
        showDeleteRant = {() =>{showDeleteRant(false)}}
        id = {id}
        refresh = {() => setRefresh(!refresh)}  

      />
    </main>


  )

}

export default Body;