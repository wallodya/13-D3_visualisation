import styles from "./layout.module.css"
import Sidebar from "./Sidebar"

type Props = {
	children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<div className="flex bg-gray-900 w-full h-full">
			<Sidebar />
             <div className="px-12 py-6">
			    {children}
             </div>
		</div>
	)
}

export default Layout
