import styles from "./choropleth.module.css"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import { RenderChoroplethType } from "../../utils.types"
import {
	Feature,
	FeatureCollection,
	GeoJsonProperties,
	Geometry,
} from "geojson"
import { GeometryObject, Objects, Topology } from "topojson-specification"

const renderChoropleth: RenderChoroplethType = async (
	conatiner,
	width,
	height,
	data
) => {
	const topoURL =
		"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
	const topoData = (await d3.json(topoURL)) as Topology<
		Objects<GeoJsonProperties>
	>
	const educationData = data

	const nationFeatures = topojson.feature(
		topoData,
		topoData.objects.nation
	) as FeatureCollection<Geometry, GeoJsonProperties>
	const statesObjects = topoData.objects.states as
		| GeometryObject<{}>
		| undefined
	const countiesFeatures = topojson.feature(
		topoData,
		topoData.objects.counties
	) as FeatureCollection<Geometry, GeoJsonProperties>
	const nation = nationFeatures.features
	const states = topojson.mesh(topoData, statesObjects)
	const counties = countiesFeatures.features

	const H = height
	const W = width
	const PADDING = 40
	const PADDING_SIDE = PADDING * 2

	const PERSENTAGE_STEPS = [3, 12, 21, 30, 39, 48, 57] as const

	const getColor = (persentage: number): string => {
		switch (true) {
			case persentage >= 57:
				return "#006D2C"
			case persentage >= 48:
				return "#238B45"
			case persentage >= 39:
				return "#41AB5D"
			case persentage >= 30:
				return "#74C476"
			case persentage >= 21:
				return "#A1D99B"
			case persentage >= 12:
				return "#C7E9C0"
			case persentage >= 3:
				return "#E5F5E0"
			default:
				return "#000000"
		}
	}

	d3.select("#chart-container").selectAll("*").remove()

	d3.select("#tooltip").remove()

	const map = d3
		.select("#chart-container")
		.append("svg")
		.attr("class", "chart-container")
		.attr("width", W)
		.attr("height", H)

	const tooltip = d3
		.select("body")
		.append("div")
		.attr("class", styles.tooltip)
		.attr("id", "tooltip")
		.style("opacity", 0)

	const legendScale = d3
		.scaleLinear()
		.domain([3, 66])
		.range([W / 2 + PADDING_SIDE, W - PADDING_SIDE])

	const legendAxis = d3
		.axisBottom(legendScale)
		.tickValues([...PERSENTAGE_STEPS, 66])
		.tickSize(0)
		.tickFormat(value => `${value}%`)

	const path = d3.geoPath()

	map.append("g")
		.attr("class", "counties")
		.attr(
			"transform",
			`translate(${PADDING_SIDE}, ${PADDING * 2})scale(0.5)`
		)
		.selectAll("path")
		.data(counties)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("class", "county")
		.attr("fill", d => {
			const edPersentage =
				educationData.find(county => county.fips === d.id)
					?.bachelorsOrHigher ?? 0
			return getColor(edPersentage)
		})
		.attr("data-fips", d => d.id ?? 0)
		.attr(
			"data-education",
			d =>
				educationData.find(county => county.fips === d.id)
					?.bachelorsOrHigher ?? 0
		)
		.attr("stroke", "#E5F5E0")
		.on("mouseover", (event, d) => {
			const county = educationData.find(c => c.fips === d.id)
			if (!county) return
			tooltip
				.transition()
				.duration(300)
				.style("opacity", 0.9)
				.attr("data-education", county.bachelorsOrHigher)
			tooltip
				.style("left", event.clientX + "px")
				.style("top", event.clientY + "px").html(`
            <strong>${county.area_name}, ${county.state}</strong><br>
            FIPS: ${county.fips}<br>
            Citizens with bachelors or higher: ${county.bachelorsOrHigher}%
          `)
		})
		.on("mouseleave", (event, d) => {
			tooltip
				.transition()
				.duration(300)
				.style("opacity", 0)
		})

	map.append("path")
		.attr(
			"transform",
			`translate(${PADDING_SIDE}, ${PADDING * 2})scale(0.5)`
		)
		.datum(states)
		.attr("class", "state-borders")
		.attr("d", path)
		.attr("fill", "none")

	map.append("text")
		.text("United States Educational Attainment")
		.attr("y", PADDING / 2)
		.attr("x", W / 2)
		.attr("id", "title")
		.attr("text-anchor", "middle")
		.attr("font-weight", "bold")
	map.append("text")
		.text(
			"Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
		)
		.attr("y", PADDING)
		.attr("x", W / 2)
		.attr("id", "description")
		.attr("text-anchor", "middle")
		.attr("font-size", 8)

	map.append("g")
		.call(legendAxis)
		.attr("transform", `translate(0, ${PADDING * 2})`)
		.selectAll("text")
		.attr("font-size", 6)
	map.selectAll(".domain").remove()

	map.append("g")
		.attr("id", "legend")
		.selectAll(".legend-rect")
		.data(PERSENTAGE_STEPS)
		.enter()
		.append("rect")
		.attr("class", "legend-rect")
		.attr("height", 5)
		.attr("width", (W - PADDING_SIDE - (W / 2 + PADDING_SIDE)) / 7)
		.attr("x", d => legendScale(d))
		.attr("y", PADDING * 2 - 5)
		.attr("fill", d => getColor(d))
}

export default renderChoropleth
