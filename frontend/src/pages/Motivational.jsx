import { useState, useEffect } from "react";
function Motivational(){
  const motivationalApi = import.meta.env.VITE_MOTIVATIONAL_API;
  const [motivationalData, setmotivationalData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchData = async () =>{
      setLoading(true);
      let motivational = [];
      for(let i=0; i<2; i++){
        const response = await fetch(motivationalApi);
        const data = await response.json();
        const motiv ={
          author: data.author,
          content: data.quote

        }
        motivational.push(motiv);
      }

      setmotivationalData((prev)=>[...prev, ...motivational]);
      setLoading(false);
    }

    fetchData();
  },[refreshKey]);

  
  return (
    <>
      <div className="pb-[20px] font-poppins flex flex-col max-w-3xl mx-auto">
        {loading ? (
          <p className="text-white text-center mt-[20px]">⏳ Please wait a moment...</p>
        ) : (
          <div>
            {motivationalData.map((data, index) => (
              <div className="flex flex-col mt-[10px] gap-[10px] mx-[10px]" key={index}>
                <div className="font-poppins bg-gray-800/80 p-[10px] rounded-xl">
                  <p className="text-white font-semibold flex items-center gap-[10px]">
                    Author: {data.author}
                  </p>
                  <p className="text-gray-300 text-justify whitespace-pre-wrap hyphens-auto">
                    {data.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="justify-center items-center flex mt-[10px]  ">
          <button
            className="text-white bg-gray-800/80 mx-[10px] p-[10px] w-full md:w-[300px] cursor-pointer rounded-full  font-semibold"
            onClick={() => setRefreshKey(!refreshKey)}
          >
            Refresh Motivational Quotes
          </button>
          
        </div>
      </div>
    </>
  );
  




}


export default Motivational;