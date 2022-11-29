import { useCallback } from "react"
import { render } from "react-dom"
import Heading from "../../components/Heading"
import SVGContainer from "../../components/SVGContainer"
import renderScatterplot from "../../utils/D3/scatterplot/scatterplot"

const URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

const Scatterplot: React.FC = (): JSX.Element => {

    useCallback(() => {
        renderScatterplot
    },[])

	return (
		<>
			<Heading text={"Scatterplot"} />
            <SVGContainer svgFunc={renderScatterplot} URL={URL}/>
		</>
	)
}

export default Scatterplot


