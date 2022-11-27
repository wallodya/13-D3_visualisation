import { useQuery } from "@tanstack/react-query"
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react"
import { getData } from "../utils/api"
import { dopingAPIResponse, renderScatterplotType } from "../utils/utils.types"

type SVGContainerProps = {
    svgFunc: renderScatterplotType,
    URL: string
    width?: number,
    height?: number
}

/**
 * Returns a div with SVG visualisation inside it
 * 
 * @param svgFunc Function that renders SVG
 * @param width - Width of the container (optional)
 * @param height - Height of the container (optional)
 * 
 * @returns JSX Element: div with SVG inside
 * */
const SVGContainer = ({svgFunc, URL, width=600, height=400}: SVGContainerProps) : JSX.Element => {

    const container = useRef() as RefObject<HTMLDivElement>

    const { data } = useQuery(['dataset', 'scatterplot'], () => {
        return getData(URL) 
    }, {
        onSuccess(data) {
            // container 
            svgFunc(
                container,
                width,
                height,
                data
            ) 
        },
    })
    
    return(
        <div
            ref={container}
            id={'chart-container'}
            className="border"
        ></div>
    )
}

export default SVGContainer
