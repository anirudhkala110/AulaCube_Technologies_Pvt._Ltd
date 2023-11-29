import logo from './logo.svg';
import './App.css';
import Homepage from './Components/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Edit from './Components/Edit';
import { createContext, useContext } from 'react';
import Read from './Components/Read';


const completeTask = createContext()

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/edit-task/:id' element={<Edit />} />
          <Route exact path='/read-task/:id' element={<Read />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
