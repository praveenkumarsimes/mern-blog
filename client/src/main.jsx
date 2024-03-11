import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider.jsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AuthContext from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <AuthContext>
            <App />
          </AuthContext>
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </>
);
