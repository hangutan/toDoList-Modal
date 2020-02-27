import React from 'react';
import './App.css';

//icons-react
import {MdDehaze} from 'react-icons/md';

import ToDoList from './Page/Todolist';

function App() {
  return (
    <>
      <div>
        <div className="header">
          <MdDehaze className="btn-dehaze"/>
        </div>

        <div className="sidebar">
          <div className="nav todolist">
            ToDoList
          </div>
          <div className="nav budget">
            Budget Calendar
          </div>
        </div>
        <ToDoList/>
        

      </div>
    </>
  );
}

export default App;
