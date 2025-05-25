import { ToastContext, EditContext } from './components/global/js/Contexts';
import { useState } from 'react';
import Landing from './components/landing/Landing';
import Toast from './components/common/toast/Toast';
import './App.scss';

function App() {
  const [toast, setToast] = useState('');
  const addToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  const [edit, setEdit] = useState({});
  const setEditData = (expense) => {
    setEdit(expense);
    document.querySelector('.form').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  return (
    <ToastContext.Provider value={{ toast, addToast }}>
      <EditContext.Provider value={{ edit, setEditData }}>
        <div className="App">
          <Landing />
          <Toast toast={toast} />
        </div>
      </EditContext.Provider>
    </ToastContext.Provider>
  );
}

export default App;
