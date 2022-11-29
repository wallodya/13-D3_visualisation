import { RefObject, useRef } from "react"
import styles from "./layout.module.css"
import Sidebar from "./Sidebar"

type Props = {
	children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ children }) => {
	const sidebar = useRef() as RefObject<HTMLDivElement>

	return (
		<div className="flex flex-col lg:grid lg:grid-cols-[250px_minmax(500px,_1fr)_minmax(300px,_400px)] w-full bg-gray-900">
			<Sidebar />
			<div className="px-12 py-6 w-full">{children}</div>
		</div>
	)
}

export default Layout
