import Heading from "../../components/Heading"
import SVGContainer from "../../components/SVGContainer"
import renderBarchart from "../../utils/D3/barchart/barchart"

const URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

const Barchart:React.FC = () : JSX.Element => {
    return (
    <>
        <Heading text={'Barchart'}/>
        <SVGContainer svgFunc={renderBarchart} URL={URL} />
    </>
    )
}

export default Barchart