import { RefObject, useEffect, useRef } from "react"
import Heading from "../../components/Heading"
import SVGContainer from "../../components/SVGContainer"
import { getData } from "../../utils/api"
import renderHeatmap from "../../utils/D3/heatmap/heatmap"
import { DopingAPIResponse, TemperatureAPIResponse } from "../../utils/utils.types"

const Heatmap = ({ data } : { data : TemperatureAPIResponse}) : JSX.Element => {

    const container = useRef() as RefObject<HTMLDivElement>

    useEffect(() => {

        const svgWidth = container.current?.offsetWidth as number
		const svgHeight = Math.floor(svgWidth / 1.41)
        renderHeatmap(container, svgWidth, svgHeight, data)

    }, [data, container])

    return (
        <>
            <Heading text={"Heatmap"}/>
            <div
                ref={container}
			    id={"chart-container"}
			    className="border bg-white rounded-xl mt-8 max-w-6xl"
		    ></div>
        </>
    )
}

export async function getServerSideProps() {

    const URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

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

export default Heatmap
