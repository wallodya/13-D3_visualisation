import { NumberValue } from "d3"

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

export type dopingAPIResponse = Array<cyclist>
