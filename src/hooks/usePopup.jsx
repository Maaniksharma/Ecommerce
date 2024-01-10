// usePopup.js
import { useState, useRef } from 'react';

const usePopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupInfo = useRef({ Title: '', Text: '' });

  const ShowPopup = (title, text) => {
    popupInfo.current.Title = title;
    popupInfo.current.Text = text;
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return { isPopupOpen, popupInfo, ShowPopup, closePopup };
};

export default usePopup;
