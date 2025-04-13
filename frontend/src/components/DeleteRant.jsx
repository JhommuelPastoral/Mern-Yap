import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function DeleteYap(props) {

  const notifySuccess = () => toast('Rant Deleted Successfully', {
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

  const notifyFail = () => toast('Rant Deleted Unsuccessfully', {
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


  const deleteRant = async () => {
    try {
      await axios.delete(`https://mern-yap-backend.onrender.com/api/rants/${props.id}`);
      props.refresh();
      props.showDeleteRant();
      notifySuccess();
      console.log('Rant deleted successfully');
    } catch (error) {
      notifyFail();
      console.error('Error deleting rant:', error.message);
    }
  };
  

  return (
    <div
      className={`${
        props.deleteRant ? 'fixed' : 'hidden'
      } inset-0 z-50 flex justify-center items-center bg-black/50 font-poppins `}
    >
      <div
        id="alert-additional-content-2"
        className="animate-zoom-in p-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 max-w-[90%] md:max-w-md"
        role="alert"
      >
        <div className="flex items-center">
          <svg
            className="shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <h3 className="text-lg font-medium">This is a message alert</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Do you really wish to delete this item?
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={()=>{ deleteRant()}}
          >
            Delete
          </button>
          <button
            type="button"
            className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
            onClick={()=>{props.showDeleteRant()}}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteYap;
