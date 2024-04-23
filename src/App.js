
import './App.css';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Home from './components/Home';
import Index from './components/Index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn/>} ></Route>
          <Route path="/register" element={<Register/>} ></Route>
          <Route path="/home" element={<Home/>} ></Route>
          <Route path="/index/:id" element={<Index/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
