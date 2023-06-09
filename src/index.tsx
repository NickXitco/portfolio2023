import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path={'*'} element={<App />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>
)
