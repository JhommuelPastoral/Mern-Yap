import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header.jsx';
import Body from './pages/Body.jsx';
import Bible from './pages/Bible.jsx';
import Motivational from './pages/Motivational.jsx';
function App() {
 
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/' element={<Body/>}></Route>
          <Route path='/Bible' element={<Bible/>}></Route>
          <Route path='/Motivational' element={<Motivational/>}></Route>

        </Routes>
      </Header>
    </BrowserRouter>
  )
}

export default App
