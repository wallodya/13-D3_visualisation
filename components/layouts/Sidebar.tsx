import Link from "next/link"

const PAGES: { name: string; link: string }[] = [
	{
		name: "Choropleth",
		link: "/choropleth",
	},
	{
		name: "Heatmap",
		link: "/heatmap",
	},
	{
		name: "Scatterplot",
		link: "/choropleth",
	},
	{
		name: "Barchart",
		link: "/barchart",
	},
]

const Sidebar: React.FC = () => {
	return (
		<nav className="sticky top-0 z-20 px-12 py-6 bg-gray-900">
			<ul className="flex flex-col gap-3">
				{PAGES.map(({ name, link }, index) => (
					<li key={index}>
						<Navlink href={link} text={name} />
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Sidebar

type NavlinkProps = {
    href: string,
    text: string
}

const Navlink: React.FC<NavlinkProps> = ({href, text} : NavlinkProps) => {
	return (
        <Link
            href={href}
            className="text-2xl font-bold text-white hover:text-blue-700 transition"
        >
            {text}
        </Link>
    )
}
