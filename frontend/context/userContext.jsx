import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [navigationHeader, setNavigate] = useState('Home');

  useEffect(() => {
    // Call the profile endpoint
    axios.get("https://mern-yap-backend.onrender.com/api/users/profile")
      .then(({ data }) => {
        // If there's a valid user, set it
        if (data) {
          setUser(data);
          navigate("/Body");
        } else {
          // If response is null, user is not logged in
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Token expired or request failed:", err);
        setUser(null);
        navigate("/");
      });
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser,navigationHeader,setNavigate }}>
      {children}
    </UserContext.Provider>
  );
}
