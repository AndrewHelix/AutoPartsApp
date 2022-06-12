import './App.css';
import Header from './components/header/header';
import { Categories } from './components/menu/Categories';
import { Route, Routes, useParams } from 'react-router-dom';
import { Subcategories } from './components/menu/Subcategories';
import { Subcategory } from './components/menu/Subcategory';
import { AddPart } from './components/mainArea/AddPart';

import { useAppDispatch, useAppSelector} from './hooks'
import { fetchVehicles } from './slices/vehicleSlice';
 

function App() {
  return (
    <div className="App">
      <h1 className='app-title'>auto parts app</h1> 
      <Header />
      <Categories />
      <Routes>
        <Route path='/:category' element={<Subcategories />}></Route>
        <Route path='/:category/:subcategory' element={<Subcategory />}></Route>
      </Routes>
      <AddPart />
    </div>
  );
  }
export default App;