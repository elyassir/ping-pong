import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App';
import { UserContextProvider } from "./components/Context/main";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <UserContextProvider>

      <StrictMode>
        <ToastContainer />
        <App />
      </StrictMode>,
    </UserContextProvider>
  </BrowserRouter>


)





/*
  The user should be able to know if he is muted or not.
  There is somthing wrong when i type something in the input field, the member rerendered. ???!
*/