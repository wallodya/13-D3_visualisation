import { RefObject, useEffect, useRef } from "react"
import Heading from "../../components/Heading"
import { getData } from "../../utils/api"
import renderTreemap from "../../utils/D3/treemap/treemap"
import { MoviesAPIResponse } from "../../utils/utils.types"

const Treemap = ({ data }: { data: MoviesAPIResponse }): JSX.Element => {

    const container = useRef() as RefObject<HTMLDivElement>
 
	useEffect(() => {
        const svgWidth = container.current?.offsetWidth as number
		const svgHeight = Math.floor(svgWidth / 1.41)
        renderTreemap(container, svgWidth, svgHeight, data)
    }, [container, data])

	return (
		<>
			<Heading text={"Tree map"} />
			<div
				ref={container}
				id={"chart-container"}
				className="border bg-white rounded-xl mt-8 max-w-6xl"
			></div>
		</>
	)
}

export async function getServerSideProps() {

    const URL =
	"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"

    const data = await getData(URL)

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: { data }
    }
}

export default Treemap
