import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './Views/Landing';
import Home from './Views/Home';
import Create from './Views/Create';
import Detail from './Views/Detail';



function App() {
  return (
    <div className="App">
       {/* <h1>Henry Videogames</h1> */}
    <Routes>
    <Route exact path={'/'} element={<Landing />}/>|
    <Route exact path={'/Home'} element={<Home />} />
    <Route exact path={'/Create'} element={<Create />} />
    <Route exact path={'/Detail/:id'} element={<Detail />}/>
  </Routes>
</div>
  );
}
export default App;
