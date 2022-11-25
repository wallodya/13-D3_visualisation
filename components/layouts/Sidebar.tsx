import styles from "./layout.module.css"
import Link from "next/link"

const Sidebar: React.FC = () => {
	return (
		<div className={styles.sidebar}>
			<ul>
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
            className="text-xl font-bold text-white hover:text-blue-600"
        >
            {text}
        </Link>
    )
}
