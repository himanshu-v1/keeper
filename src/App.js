import { ToastContext, EditContext } from './global/js/Contexts';
import { useState } from 'react';
import Landing from './components/landing/Landing';
import Toast from './common/toast/Toast';
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

  return (
    <ToastContext.Provider value={{ toast, addToast }}>
      <EditContext.Provider value={{ editData, addEditData }}>
        <div className="App">
          <Landing />
          <Toast toast={toast} />
        </div>
      </EditContext.Provider>
    </ToastContext.Provider>
  );
}

export default App;
