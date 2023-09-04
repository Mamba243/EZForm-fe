import React from 'react';
import logo from './logo.svg';
import 'antd/dist/reset.css'
import './App.css';
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'

function App() {
  return (
    <div className="App">
      <RouterProvider router={routerConfig}></RouterProvider>
    </div>
  );
}

export default App;
