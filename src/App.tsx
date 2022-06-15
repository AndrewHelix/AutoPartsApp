import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PartPage } from './components/partPage/PartPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/:name' element={<PartPage />}></Route>
      </Routes>
    </>
  );
  }
export default App;