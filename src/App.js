import logo from './logo.svg';
import './App.css';
import Task from './pages/Task';
import Navbar from './Navbar';
import {Routes, Route} from "react-router-dom"
import Detail from './pages/Detail';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Task />} />
         <Route path='/:id' element={<Detail/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
