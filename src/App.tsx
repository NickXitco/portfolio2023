import { useLocation } from 'react-router-dom'
import { Homepage } from './components/Homepage'
import { usePrevious } from './hooks/usePrevious'
import { MainFrame } from './components/MainFrame'
import { ProjectView } from './components/ProjectView'
import { findProject } from './assets/projects'

const App = () => {
	const location = useLocation()
	const previousLocation = usePrevious(location)

	const projectID = location.pathname.split('/')[2] || previousLocation?.pathname.split('/')[2] || ''

	const project = findProject(projectID)

	const showProjectView = location.pathname.split('/')[1] === 'project' && project !== undefined
	return (
		<main>
			<MainFrame>
				<Homepage visible={!showProjectView} />
			</MainFrame>
			<ProjectView project={project} visible={showProjectView} />
		</main>
	)
}

export default App
