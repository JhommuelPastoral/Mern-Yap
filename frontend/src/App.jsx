import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header.jsx';
import Body from './pages/Body.jsx';
import Bible from './pages/Bible.jsx';
import Motivational from './pages/Motivational.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import UserContextProvider  from "../context/userContext.jsx";

axios.defaults.withCredentials = true;
function App() {
 
  return (

    <BrowserRouter>
        {/* <Header/> */}
        <UserContextProvider>
          <Toaster position="bottom-right" reverseOrder={false} toastOptions={{duration: 5000}}/>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/Register' element={<Register/>}></Route>
            <Route path='/Body' element={<Body/>}></Route>
            <Route path='/Bible' element={<Bible/>}></Route>
            <Route path='/Motivational' element={<Motivational/>}></Route>
          </Routes>
        </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
