import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addrant(props) {
  const [rant, setRant] = useState('');
  const [submitting, setIsSubmitting] = useState(false);

  const notifySuccess = () => toast('Rant Added Successfully', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    className: 'bg-red-50'
  });

  const notifyFail = () => toast('Rant Added Unsuccessfully', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });


  const addRant = async () => {
    
    if (rant === '') {
      alert('Put Some Message');
      return;
    }
    if (submitting) return;

    setIsSubmitting(true);
    const newRant = {
      name: "Anonymous Yapper",
      rant,
      date: dayjs().format('dddd, MMMM, D'),
      time: dayjs().format('hh:mm A')
    };

    try {
      await axios.post('https://mern-yap-backend.onrender.com/api/rants', newRant);
      props.showAddRant();
      props.refresh();
      setRant('');
      notifySuccess(); 
    } catch (err) {
      notifyFail();
      console.error("Error posting rant:", err.message);
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={`${props.addRant ? 'fixed' : 'hidden'} inset-0 justify-center flex items-center bg-black/90`}>
        <div className="bg-gray-800/80 p-[10px] rounded-xl  flex flex-col gap-[10px] w-[calc(100vw-20px)] md:w-[500px] lg:w-[800px] animate-zoom-in">
          <p className="text-white font-semibold">Add Your Yap, Yapper:</p>
          <textarea
            value={rant}
            onChange={(event) => setRant(event.target.value)}
            className="border-white border text-white h-[150px] px-[10px] text-justify break-words"
          ></textarea>

          {/* Button Container */}
          <div className="flex justify-end items-center gap-[10px]">
            <button
              className="text-white bg-red-700 hover:bg-red-600 p-[5px] rounded-md transition-all duration-300 shadow-md shadow-red-700/50 hover:shadow-red-600/80"
              onClick={() => {
                setRant('');
                props.showAddRant();
              }}
            >
              Cancel Yap
            </button>
            <button
              className="text-white bg-gray-700 hover:bg-gray-600 p-[5px] rounded-md transition-all duration-300 shadow-md shadow-gray-700/50 hover:shadow-gray-600/80"
              onClick={addRant}
            >
              Add Yap
            </button>
          </div>
        </div>
      </div>

      <ToastContainer  />
    </>
  );
}

export default Addrant;
