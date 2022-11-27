import Heading from "../../components/Heading"

const Scatterplot: React.FC = (): JSX.Element => {
	return (
		<>
			<Heading text={"Scatterplot"} />
            <SVGContainer svgFunc={function (): void {
                throw new Error("Function not implemented.")
            } }/>
		</>
	)
}

export default Scatterplot

type SVGContainerProps = {
    svgFunc: () => void,
    width?: number,
    height?: number
}

const SVGContainer = ({svgFunc, width=600, height=400}: SVGContainerProps) : JSX.Element => {
    /**
     * Returns a div with SVG visualisation inside it
     * 
     * @param width - Width of the container (optional)
     * @param height - Height of the container (optional)
     * 
     * @returns JSX Element: div with SVG inside
     * **/
    return <div className="border"></div>
}
