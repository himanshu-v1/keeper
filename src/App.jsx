import { ToastContext, EditContext } from './global/js/Contexts';
import { useState } from 'react';
import Toast from './common/toast/Toast';
import Routing from './router/router';
import './App.scss';

function App() {
  const [toast, setToast] = useState('');
  const addToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  const [editData, setEditData] = useState({});
  const addEditData = (expense) => {
    setEditData(expense);
    document.querySelector('.form').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  // document.addEventListener("visibilitychange", () => {
  //   if (document.hidden) {
  //     console.log('unload');
  //   }
  // });

  // window.onbeforeunload = (e) => {
  //   console.log('reload');
  //   e.preventDefault(); // Standard syntax
  //   e.returnValue = ''; // Legacy syntax 
  // }

  return (
    <ToastContext.Provider value={{ toast, addToast }}>
      <EditContext.Provider value={{ editData, addEditData }}>
        <div className="App">
          <Routing />
          <Toast toast={toast} />
        </div>
      </EditContext.Provider>
    </ToastContext.Provider>
  );
}

export default App;
