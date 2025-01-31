import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import './index.css';

const rootElement = document.getElementById('root'); // Ensure this matches the element in public/index.html
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Create a React root and render the app
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
