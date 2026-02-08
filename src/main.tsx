import ReactDOM from 'react-dom/client';
import App from './App';
import './css/style.css';
import './css/index.css';
// import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
