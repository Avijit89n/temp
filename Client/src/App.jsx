import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Account from './pages/Account'
import Device from './pages/Device'
import Options from './pages/Options'
import About from './pages/About'
import PageNotFound from './common/PageNotFound'
import Layout from './common/Layout'
import AddDevice from './pages/AddDevice'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/device' element={<Device />} />
        <Route path='/option' element={<Options />} />
        <Route path='/about' element={<About />} />
        <Route path='/account' element={<Account />} />
        <Route path='/add/new-device' element={<AddDevice/>} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
