import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css';

import InventoryDashboard from './components/InventoryDashboard';
import Layout from "./components/Layout"
import CheckoutForm from "./components/CheckoutForm"

import { initializeApp } from 'firebase/app';

initializeApp({
  apiKey: "AIzaSyAfouK7rufR-0RkkDAdNMbZrTEIuFoDE50",
  authDomain: "lostfound-makerspace.firebaseapp.com",
  projectId: "lostfound-makerspace",
  storageBucket: "lostfound-makerspace.firebasestorage.app",
  messagingSenderId: "52755277898",
  appId: "1:52755277898:web:8ecffb215b6031ec6c5eb3",
  measurementId: "G-93D2S4C08N"
})

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<InventoryDashboard/>}/>
        <Route path="/checkout" element={<CheckoutForm/>}/>
      </Route>
    </Routes>
  );
}


export default App;
