import { type } from "os"
import { RefObject } from "react"

// Scatterplot

type Cyclist = {
	Time: string
	Place: number
	Seconds: number
	Name: string
	Year: number
	Nationality: string
	Doping: string | null
	URL: string | null
}

export type DopingAPIResponse = Array<Cyclist>

export type RenderScatterplotType = (
	container: RefObject<HTMLDivElement>,
	width: number,
	height: number,
	data: DopingAPIResponse
) => void

// Barchart

type GDPData = [string | Date, number][]

export type US_GDP_APIResponse = {
	errors: string
	id: number
	source_name: string
	source_code: string
	code: string
	name: string
	urlize_name: string
	display_url: string
	description: string
	updated_at: string | Date
	frequency: string
	from_date: string | Date
	to_date: string | Date
	column_names: string[]
	private: boolean
	type: any
	premium: boolean
	data: GDPData
}

export type RenderBarchartType = (
	container: RefObject<HTMLDivElement>,
	width: number,
	height: number,
	data: US_GDP_APIResponse
) => void

// Heatmap

type MonthlyTempVariance = {
	year: number
	month: number
	variance: number
}

export type TemperatureAPIResponse = {
	baseTemperature: number
	monthlyVariance: MonthlyTempVariance[]
}

export type RenderHeatmapType = (
	container: RefObject<HTMLDivElement>,
	width: number,
	height: number,
	data: TemperatureAPIResponse
) => void

// Chpeppleth

export type TopoJSONUSA = {
    type: "Topology"
    objects: {
        counties: {
            type: "GeomatryCollection"
            geometries: {}[]
        }
        states: {
            type: "GeomatryCollection"
            geometries: {}[]
        }
        nation: {
            type: "GeomatryCollection"
            geometries: {}[]
        }
    }
    arcs: [number, number][][]
}

export type EducationAPIResponse = Array<{
    "fips": number
    "state": string
    "area_name": string
    "bachelorsOrHigher": number
}>

export type RenderChoroplethType = (
    container: RefObject<HTMLDivElement>,
    width: number,
    height: number,
    data: EducationAPIResponse
) => Promise<void>

// Treemap

export type Movie = {
    name: string
    category: string
    value: string
}

type MovieGenres = "Action" | "Drama" | "Adventure" | "Family" | "Animation" | "Comedy" | "Biography"

export type MoviesAPIResponse = {
    name: "Movies"
    children: {
        name: MovieGenres
        children: Array<Movie>
    }[]
}

export type RenderTreemapType = (
    container: RefObject<HTMLDivElement>,
    width: number,
    height: number,
    data: MoviesAPIResponse
) => void

export type NodeData = {
    name: string,
    children: Node[] | Movie[] | NodeData[]
}

export type TreeNode = {
    children: any[],
    data: NodeData,
    depth: number,
    height: number,
    parent: TreeNode | null,
    value: number,
    x0: number,
    x1: number,
    y0: number,
    y1: number
}