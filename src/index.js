import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import { Provider } from 'react-redux'
import store, { persistor } from '../src/store/store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>,
  document.getElementById('root')
)
