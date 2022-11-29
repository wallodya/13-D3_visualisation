import Heading from "../../components/Heading"
import SVGContainer from "../../components/SVGContainer"
import renderTreemap from "../../utils/D3/treemap/treemap"

const URL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'

const Treemap: React.FC = () : JSX.Element => {
    return (
        <>
            <Heading text={'Tree map'}/>
            <SVGContainer svgFunc={renderTreemap} URL={URL} />
        </>
    )
}

export default Treemap
