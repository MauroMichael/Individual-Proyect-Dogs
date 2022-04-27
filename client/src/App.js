import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Breeds from './components/Breeds';
import DetailBreed from './components/DetailBreed';
import CreateBreed from './components/CreateBreed';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<LandingPage/>}/>
        <Route path = '/dogs' element = {<Breeds/>}/>
        <Route path = '/dogs/:id' element = {<DetailBreed/>}/>
        <Route path = '/dogs/createBreed' element = {<CreateBreed/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
