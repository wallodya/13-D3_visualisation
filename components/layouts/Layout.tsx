import { RefObject, useRef } from "react"
import styles from "./layout.module.css"
import Sidebar from "./Sidebar"

type Props = {
	children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ children }) => {
	const sidebar = useRef() as RefObject<HTMLDivElement>

	return (
		<div className="w-full h-full flex flex-col lg:grid lg:grid-cols-[250px_minmax(500px,_1fr)_250px] bg-gray-900">
            <div className="relative h-full shadow-2xl">
			    <Sidebar />
            </div>  
			{/* <div className="px-12 py-6 w-full flex flex-col items-center"> */}
                <div className="max-w-6xl py-6">{children}</div>
            {/* </div> */}
		</div>
	)
}

export default Layout
