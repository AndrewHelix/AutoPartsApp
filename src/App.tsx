import './App.css';
import Header from './components/header/header';
import { Categories } from './components/menu/Categories';
import { Route, Routes, useParams } from 'react-router-dom';
import { Subcategories } from './components/menu/Subcategories';
import { Subcategory } from './components/menu/Subcategory';
import { AddPart } from './components/mainArea/AddPart';

import { useAppDispatch, useAppSelector} from './hooks'
import { fetchVehicles } from './slices/vehicleSlice';

import { Layout } from './components/Layout';
import { PartPage } from './components/PartPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/:name' element={<PartPage />}></Route>
      </Routes>
    
      {/* <h1 className='app-title'>auto parts app</h1> 
      <Header />
      <Categories /> */}
      {/* <Subcategories /> */}
      {/* <Routes>
        <Route path='/:category' element={}></Route>
        <Route path='/:category/:subcategory' element={<Subcategory />}></Route>
      </Routes> */}
      {/* <AddPart /> */}
    </>
  );
  }
export default App;