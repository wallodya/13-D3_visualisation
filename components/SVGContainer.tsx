import { useRef } from "react"

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

    const container = useRef()

    useCallback(
      () => {
        svgFunc
      },
      [svgFunc],
    )
    

    return <div className="border"></div>
}

export default SVGContainer
