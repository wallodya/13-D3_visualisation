import Heading from "../../components/Heading"
import SVGContainer from "../../components/SVGContainer"
import renderChoropleth from "../../utils/D3/choropleth/choropleth"

const URL_EDUCATION = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'

const Choropleth:React.FC = (): JSX.Element => {
    return (
        <>
            <Heading text={'Choropleth'}/>
            <SVGContainer svgFunc={renderChoropleth} URL={URL_EDUCATION} />
        </>
    )
}

export default Choropleth
