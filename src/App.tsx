import { useLocation } from 'react-router-dom'
import { Homepage } from './components/Homepage'
import { usePrevious } from './hooks/usePrevious'
import { MainFrame } from './components/MainFrame'

const App = () => {
	const location = useLocation()
	const previousLocation = usePrevious(location)

	return (
		<main>
			<MainFrame>
				<Homepage />
			</MainFrame>
		</main>
	)

	//return <Error404 />
}

export default App
