import React from 'react';
import logo from './logo.svg';
import './App.css';
import {UserProvider} from "./userContext/userContext"
import Main from './layout/main'

function App() {
  return (
   
      <>
        <UserProvider>
          <Main />
        </UserProvider>
      </>
    );
  }

export default App;
