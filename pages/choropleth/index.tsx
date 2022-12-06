import { RefObject, useEffect, useRef } from "react"
import Heading from "../../components/Heading"
import { getData } from "../../utils/api"
import renderChoropleth from "../../utils/D3/choropleth/choropleth"
import { EducationAPIResponse } from "../../utils/utils.types"

const Choropleth = ({ data } : { data: EducationAPIResponse}): JSX.Element => {

    const container = useRef() as RefObject<HTMLDivElement> 

    useEffect(() => {

        const svgWidth = container.current?.offsetWidth as number
		const svgHeight = Math.floor(svgWidth / 1.41)
        renderChoropleth(container, svgWidth, svgHeight, data)

    }, [data, container])

	return (
        <>  
            <Heading text="Choropleth" />
            <div
                ref={container}
                id={"chart-container"}
                className="border bg-white rounded-xl mt-8 max-w-6xl"
            ></div>
        </>
	)
}

export async function getServerSideProps() {
    const URL_EDUCATION =
	"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
    
    const data = await getData(URL_EDUCATION) 

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props : { data }
    }
}

export default Choropleth
