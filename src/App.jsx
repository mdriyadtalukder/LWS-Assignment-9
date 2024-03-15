import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar'
import Home from './component/Home'
import Add from './component/Add'
import Edit from './component/Edit'

function App() {


  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/add' element={<Add></Add>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>

      </Routes>
    </>
  )
}

export default App
