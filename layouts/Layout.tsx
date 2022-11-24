import styles from "./layout.module.css"
import Sidebar from "./Sidebar"

type Props = {
	children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<Sidebar />
			{children}
		</>
	)
}

export default Layout
