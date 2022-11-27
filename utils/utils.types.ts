import { NumberValue } from "d3"
import { type } from "os"
import { RefObject } from "react"

type cyclist = {
	Time: string
	Place: number
	Seconds: number
	Name: string
	Year: number
	Nationality: string
	Doping: string | null
	URL: string | null
}

export type renderScatterplotType = (
    container: RefObject<HTMLDivElement>,
    width: number,
    height: number,
    data: dopingAPIResponse
) => Promise<void>

export type dopingAPIResponse = Array<cyclist>
