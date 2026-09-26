import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { BagProvider } from './context/BagContext.jsx';
import '@fontsource-variable/archivo/standard.css';
import '@fontsource-variable/bodoni-moda/opsz.css';
import '@fontsource-variable/bodoni-moda/opsz-italic.css';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BagProvider>
        <App />
      </BagProvider>
    </BrowserRouter>
  </React.StrictMode>
);
