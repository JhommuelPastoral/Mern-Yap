import { useEffect, useState } from "react";

function Bible() {
  const bibleApiUrl = import.meta.env.VITE_BIBLE_API;
  const [dataBible, setDataBible] = useState([]);
  const [refreshKey, setRefreshKey] = useState(true); 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let verses = []; 
      for (let i = 0; i < 2; i++) {
        const response = await fetch(bibleApiUrl);
        const data = await response.json();
        const bible = {
          book: data.random_verse.book,
          chapter: data.random_verse.chapter,
          verse: data.random_verse.verse,
          text: data.random_verse.text,
        };
        verses.push(bible); 
      }
      setDataBible((prevState) => [...prevState, ...verses]);
      setLoading(false);

    };

    fetchData();
  }, [refreshKey]);

  return (
    <>
      <div className="pb-[20px] font-poppins flex flex-col max-w-3xl mx-auto">
        {loading ? (
          <p className="text-white text-center mt-[20px]">⏳ Please wait a moment...</p>
        ) : (
          dataBible.map((bible, index) => (
            <div className="flex flex-col mt-[10px] gap-[10px] mx-[10px]" key={index}>
              <div className="font-poppins bg-gray-800/80 p-[10px] rounded-xl">
                <p className="text-white font-semibold flex items-center gap-[10px]">
                  {bible.book}:{bible.chapter}:{bible.verse}
                </p>
                <p className="text-white text-justify">
                  {bible.text}
                </p>
              </div>
            </div>
          ))
        )}
        <div className="justify-center items-center flex mt-[10px]  ">
          <button
            className="text-white bg-gray-800/80 mx-[10px] p-[10px] w-full md:w-[300px] cursor-pointer rounded-full  font-semibold"
            onClick={() => setRefreshKey(!refreshKey)}
          >
            Refresh Bible Verse
          </button>
          
        </div>
      </div>
    </>
  );
}

export default Bible;
