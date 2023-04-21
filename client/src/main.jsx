import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
// axios default
axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common.Authorization = `Bearer  ${window.localStorage.getItem('token')}`;
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
