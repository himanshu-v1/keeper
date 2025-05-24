import { ToastContext } from './components/global/js/ToastContext';
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

  return (
    <ToastContext.Provider value={{ toast, addToast }}>
      <div className="App">
        <Landing />
        <Toast toast={toast} />
      </div>
    </ToastContext.Provider>
  );
}

export default App;
