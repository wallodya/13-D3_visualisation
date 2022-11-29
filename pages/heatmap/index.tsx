import { RefObject } from "react"
import Heading from "../../components/Heading"
import SVGContainer from "../../components/SVGContainer"
import renderHeatmap from "../../utils/D3/heatmap/heatmap"
import { DopingAPIResponse } from "../../utils/utils.types"

const URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

const Heatmap: React.FC = () : JSX.Element => {
    return (
        <>
            <Heading text={"Heatmap"}/>
            <SVGContainer svgFunc={renderHeatmap} URL={URL}/>
        </>
    )
}

export default Heatmap
