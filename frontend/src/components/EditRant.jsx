import axios from "axios";
import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function EditRant(props){
  const mainMesage = props.message;
  const [rant, SetRant] = useState(props.message);


  const notifySuccess = () => toast('Rant Updated Successfully', {
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

  const notifyFail = () => toast('Rant Updated Unsuccessfully', {
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


  useEffect(() => {
    SetRant(props.message || "");
  }, [props.message]);

  const editYap = async () => {
    const updateYap = {
      rant: rant,
    };
  
    try {
      await axios.put(`https://mern-yap-backend.onrender.com/api/rants/${props.id}`, updateYap);
      console.log('Rant updated successfully');
      props.showEditRant();
      props.refresh();
      notifySuccess();
    } catch (error) {
      notifyFail();
      console.error('Error updating rant:', error.message);
    }
  };

  return(
    <>
      <div  className={`${props.editRant ? 'fixed' : 'hidden'} inset-0 justify-center flex items-center bg-black/90 `}>
        <div className="bg-gray-800/80 p-[10px] rounded-xl flex flex-col gap-[10px]  w-[calc(100vw-20px)] animate-zoom-in">
          <p className="text-white font-semibold"> Edit Your Yapping: </p>
          <textarea value={rant} onChange={(event) => {SetRant(event.target.value)}} className="border-white border text-white h-[150px] text-justify px-[10px]"></textarea>

          {/* Button Container */}
          <div className="flex justify-end items-center gap-[10px]">
            <button className="text-white bg-gray-700 hover:bg-gray-600  p-[5px] rounded-md transition-all duration-300 shadow-md shadow-gray-700/50 hover:shadow-gray-600/80" 
              onClick={()=>{ editYap()}}> Update Yap
            </button>
            <button className="text-white bg-red-700 hover:bg-red-600  p-[5px] rounded-md transition-all duration-300 shadow-md shadow-red-700/50 hover:shadow-red-600/80" 
              onClick={ () =>{ props.showEditRant(); SetRant(mainMesage)}}> Cancel Yap
            </button>
          </div> 
        </div>
      </div>
    </>


  )


}

export default EditRant;
