import { RefObject, useCallback, useEffect, useRef } from "react"
import { render } from "react-dom"
import Heading from "../../components/Heading"
import SVGContainer from "../../components/SVGContainer"
import { getData } from "../../utils/api"
import renderScatterplot from "../../utils/D3/scatterplot/scatterplot"
import { DopingAPIResponse } from "../../utils/utils.types"

const Scatterplot = ({ data } : { data : DopingAPIResponse}): JSX.Element => {

    const container = useRef() as RefObject<HTMLDivElement>

    useEffect(() => {
        const svgWidth = container.current?.offsetWidth as number
		const svgHeight = Math.floor(svgWidth / 1.41)
        renderScatterplot(container, svgWidth, svgHeight, data)
    }, [container, data])


	return (
		<>
			<Heading text={"Scatterplot"} />
            <div
				ref={container}
				id={"chart-container"}
				className="border bg-white rounded-xl mt-8 max-w-6xl"
			></div>
		</>
	)
}

export async function getServerSideProps() {

    const URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

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

export default Scatterplot


