import { RefObject, useEffect, useRef } from "react"
import Heading from "../../components/Heading"
import SVGContainer from "../../components/SVGContainer"
import { getData } from "../../utils/api"
import renderBarchart from "../../utils/D3/barchart/barchart"
import { US_GDP_APIResponse } from "../../utils/utils.types"

const Barchart = (data : US_GDP_APIResponse ): JSX.Element => {

    const container = useRef() as RefObject<HTMLDivElement>

    useEffect(() => {
        const svgWidth = container.current?.offsetWidth as number
		const svgHeight = Math.floor(svgWidth / 1.41)
        renderBarchart(container, svgWidth, svgHeight, data)
    }, [container, data])
	return (
		<>
			<Heading text={"Barchart"} />
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
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

	const data = await getData(URL)

	if (!data) {
		return {
			notFound: true,
		}
	}

	return {
		props: data,
	}
}

export default Barchart
