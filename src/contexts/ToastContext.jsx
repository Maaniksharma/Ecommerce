import { useState, createContext } from 'react';
export const ToastContext = createContext();
import Toast from '../components/Toast';
export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);

  function showToast(message) {
    setMessage(message);
    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && <Toast message={message} />}
    </ToastContext.Provider>
  );
}
