import styles from "./layout.module.css"
import Sidebar from "./Sidebar"

type Props = {
	children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<div className="bg-gray-900 w-full h-full">
			<Sidebar />
			{children}
		</div>
	)
}

export default Layout
