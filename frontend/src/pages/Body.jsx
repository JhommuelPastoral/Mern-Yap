import Profile from '../assets/profile.jpg';
import dayjs from "dayjs";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Addrant from '../components/AddRant.jsx';
import EditRant from '../components/EditRant.jsx';
import DeleteYap from '../components/DeleteRant.jsx';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Body() {
  const [rants, setRants] = useState([]);
  const [loading, setLoading] = useState(true); // ← Add this
  const [addRant, showAddRant] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editRant, showEditRant] = useState(false);
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [deleteRant, showDeleteRant] = useState(false);

  useEffect(() => {
    const fetchRants = async (isInitial = false) => {
      if (isInitial) setLoading(true); // only show skeleton on first load

      try {
        const res = await axios.get('https://mern-yap-backend.onrender.com/api/rants');
        setRants(res.data.data.reverse());
      } catch (err) {
        console.error('Error fetching rants:', err.message);
      } finally {
        if (isInitial) setLoading(false); // stop skeleton only if it was first load
      }
    };

    fetchRants(true); // call once with skeleton

    const interval = setInterval(() => {
      fetchRants(false); // silent refresh every 5 seconds
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="md:hidden mx-[10px] font-poppins mt-[10px] max-w-[1100px] pb-[50px] flex flex-col gap-[10px]">
      <div className="flex justify-start gap-[10px] items-center p-[5px] rounded-full mb-[10px] bg-gray-800/80">
        <img src={Profile} className="w-[40px] h-[40px] rounded-full object-center object-cover" />
        <input onClick={() => showAddRant(true)} type="text" readOnly className="border border-white w-full rounded-full py-[5px] px-[10px] text-gray-400" placeholder="What's on your mind Yapper?" />
      </div>

      <Addrant
        addRant={addRant}
        showAddRant={() => showAddRant(false)}
        refresh={() => setRefresh(!refresh)}
      />

      {loading ? (
        // ⬇ Skeleton rendering
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800/80 p-[10px] rounded-xl space-y-2 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-[40px] h-[40px] bg-gray-700 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="w-1/3 h-3 bg-gray-700 rounded" />
                  <div className="w-1/4 h-2 bg-gray-700 rounded" />
                </div>
              </div>
              <div className="h-3 bg-gray-700 rounded w-full" />
              <div className="h-3 bg-gray-700 rounded w-5/6" />
            </div>
          ))}
        </SkeletonTheme>
      ) : (
        rants.map((data) => (
          <div className="font-poppins bg-gray-800/80 p-[10px] rounded-xl" key={data._id}>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-[10px]">
                <img src={Profile} className="w-[40px] h-[40px] rounded-full object-center object-cover" />
                <div>
                  <p className="text-white font-semibold flex items-center gap-[2px] m-0">{data.name} <span className="text-green-500 text-lg">&middot;</span></p>
                  <p className="text-gray-400 m-0">{data.date}, {data.time}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-justify break-words">{data.rant}</p>
          </div>
        ))
      )}

      <EditRant
        editRant={editRant}
        showEditRant={() => showEditRant(false)}
        refresh={() => setRefresh(!refresh)}
        message={message}
        id={id}
      />

      <DeleteYap
        deleteRant={deleteRant}
        showDeleteRant={() => showDeleteRant(false)}
        id={id}
        refresh={() => setRefresh(!refresh)}
      />
    </main>
  );
}

export default Body;
