import * as d3 from "d3"
import { NumberValue } from "d3"
import { getData } from "../api"
import { dopingAPIResponse, renderScatterplotType } from "../utils.types"

/**
 * Converts time in "12:00" format to integer
 * 
 * @param time time string, separated by ":"
 * @returns number of minutes (number)
*/
const timeToInt = (time: string) : number => {
	return +time.split(":")[0] * 60 + +time.split(":")[1]
}


/**
 * 
 * Renders a scatterplot, for now works only for one case
 * 
 * @param width Width of the svg graphic
 * @param height Height of the svg graphic
 * @param URL URL to fetch data from
 * @returns void
 */
const renderScatterplot : renderScatterplotType = async (container, width, height, data) => {

	const dataset = data

	const H = height
	const W = width
	const R = 5
	const PADDING = 40
	const PADDING_SIDE = PADDING * 2

    const minXValue = d3.min(dataset, d => d.Year - 1) as number
    const maxXValue = d3.max(dataset, d => d.Year) as number

	const xScale = d3
		.scaleLinear()
		.domain([
			minXValue,
			maxXValue,
		])
		.range([PADDING_SIDE, W - PADDING_SIDE])

    const minYValue = d3.min(dataset, (d) => timeToInt(d.Time) - 10) as number
    const maxYValue = d3.max(dataset, (d) => timeToInt(d.Time)) as number

	const yScale = d3
		.scaleLinear()
		.domain([
			minYValue,
			maxYValue
		])
		.range([PADDING, H - PADDING])

	const xAxis = d3.axisBottom(xScale).tickFormat(y => `${y}`)

	const yAxis = d3
		.axisLeft(yScale)
		.tickFormat(
			int => `${Math.floor(+int / 60)}:${("0" + (+int % 60)).slice(-2)}`
		)

	const chart = d3.select("#chart-container")
		.append("svg")
		.attr("class", "chart-container")
		.attr("width", W)
		.attr("height", H)

	const tooltip = d3
		.select("body")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0)

	chart
		.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("r", R)
		.attr("cx", d => xScale(d.Year))
		.attr("cy", d => yScale(timeToInt(d.Time)))
		.attr("fill", d => (d.Doping ? "#398ad7" : "#f04c04"))
		.attr("data-xvalue", d => d.Year)
		.attr("data-yvalue", d => new Date(timeToInt(d.Time) * 1000).toString())
		.attr("class", "dot")
		.on("mouseover", (event, d) => {
			tooltip
				.transition()
				.duration(200)
				.style("opacity", 0.9)
				.attr("data-year", d.Year)

			tooltip
				.attr("id", "tooltip")
				.html(
					`
                  <strong>${d.Name}, ${d.Nationality}</strong><br>
                  Year: ${d.Year}. Time: ${d.Time}<br>
                  <br>
                  ${d.Doping || "No dopping allegations"}
               `
				)
				// .style('position', 'absolute')
				.style("left", event.clientX + "px")
				.style("top", event.clientY + "px")
		})
		.on("mouseout", () => {
			tooltip
				.transition()
				.duration(200)
				.style("opacity", 0)
				.attr("id", "")
		})

	chart
		.append("g")
		.attr("id", "x-axis")
		.call(xAxis)
		.attr("transform", `translate(0, ${H - PADDING})`)

	chart
		.append("g")
		.attr("id", "y-axis")
		.call(yAxis)
		.attr("transform", `translate(${PADDING_SIDE}, 0)`)

	chart
		.append("text")
		.attr("id", "title")
		.text("Doping in Professional Bicycle Racing")
		.attr("text-anchor", "middle")
		.attr("x", W / 2)
		.attr("y", PADDING / 2)
		.attr("font-size", 16)
		.attr("font-weight", "bold")

	chart
		.append("text")
		.text("35 Fastest times up Alpe d'Huez")
		.attr("text-anchor", "middle")
		.attr("x", W / 2)
		.attr("y", PADDING)
		.attr("font-size", 12)
	// .attr('width', 100)

	chart
		.append("text")
		.text("Time in Minutes")
		.attr("font-size", 12)
		.attr("text-anchor", "middle")
		.attr("transform", `translate(${PADDING / 2}, ${H / 2})rotate(270)`)

	const legend = chart
		.append("g")
		.attr("id", "legend")
		.attr("transform", `translate(${W - PADDING_SIDE}, ${H / 2})`)

	legend
		.append("text")
		.text("No doping allegations")
		.attr("font-size", 8)
		.attr("y", -10)
		.attr("text-anchor", "end")

	legend
		.append("rect")
		.attr("width", 16)
		.attr("height", 16)
		.attr("y", -21)
		.attr("x", 4)
		.attr("fill", "#f04c04")

	legend
		.append("text")
		.text("Riders with doping allegations")
		.attr("font-size", 8)
		.attr("y", 10)
		.attr("text-anchor", "end")

	legend
		.append("rect")
		.attr("width", 16)
		.attr("height", 16)
		.attr("y", 0)
		.attr("x", 4)
		.attr("fill", "#398ad7")
}

export default renderScatterplot
