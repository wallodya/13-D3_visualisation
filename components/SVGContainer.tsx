import { useQuery } from "@tanstack/react-query"
import { RefObject, useRef } from "react"
import { getData } from "../utils/api"
import {
	RenderBarchartType,
	RenderChoroplethType,
	RenderHeatmapType,
	RenderScatterplotType,
	RenderTreemapType,
} from "../utils/utils.types"

type SVGContainerProps = {
	svgFunc:
		| RenderScatterplotType
		| RenderBarchartType
		| RenderHeatmapType
		| RenderChoroplethType
		| RenderTreemapType
	URL: string
}

/**
 * Returns a div with SVG visualisation inside it
 *
 * @param svgFunc Function that renders SVG
 *
 * @returns JSX Element: div with SVG inside
 * */
const SVGContainer = ({ svgFunc, URL }: SVGContainerProps): JSX.Element => {
	const container = useRef(null) as RefObject<HTMLDivElement>

	useQuery(
		["dataset", "scatterplot"],
		() => {
			return getData(URL)
		},
		{
			onSuccess(data) {
				const svgWidth = container.current?.offsetWidth as number
				const svgHeight = Math.floor(svgWidth / 1.41)
				svgFunc(container, svgWidth, svgHeight, data)
			},
		}
	)

	return (
		<div
			ref={container}
			id={"chart-container"}
			className="border bg-white rounded-xl mt-8 max-w-6xl"
		></div>
	)
}

export default SVGContainer
