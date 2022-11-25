import styles from "./layout.module.css"
import Link from "next/link"

const Sidebar: React.FC = () => {
	return (
		<div className="px-12 py-6 fixed h-full bg-gray-900 shadow-2xl">
			<ul className="flex flex-col gap-3">
				<li>
					<Navlink href={'/heatmap'} text={'Heatmap'}/>
				</li>
				<li>
					<Navlink href={'/scatterplot'} text={'Scatterplot'}/>
				</li>
				<li>
					<Navlink href={'/barchart'} text={'Barchart'}/>
				</li>
			</ul>
		</div>
	)
}

export default Sidebar

type NavlinkProps = {
    href: string,
    text: string
}

const Navlink: React.FC<NavlinkProps> = ({href, text} : NavlinkProps) : JSX.Element => {
	return (
        <Link
            href={href}
            className="text-2xl font-bold text-white hover:text-blue-700 transition"
        >
            {text}
        </Link>
    )
}
