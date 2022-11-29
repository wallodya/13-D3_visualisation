import Link from "next/link"

const Sidebar: React.FC = () => {
	return (
		<nav className="sticky top-0 z-20 px-12 py-6 bg-gray-900">
			<ul className="flex flex-col gap-3">
				<li>
					<Navlink href={'/choropleth'} text={'Choropleth'}/>
				</li>
				<li>
					<Navlink href={'/heatmap'} text={'Heatmap'}/>
				</li>
				<li>
					<Navlink href={'/treemap'} text={'Tree map'}/>
				</li>
				<li>
					<Navlink href={'/scatterplot'} text={'Scatterplot'}/>
				</li>
				<li>
					<Navlink href={'/barchart'} text={'Barchart'}/>
				</li>
			</ul>
		</nav>
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
