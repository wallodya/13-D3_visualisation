import * as d3 from "d3"
import styles from './barchart.module.css'
import { RenderBarchartType } from "../../utils.types"

const renderBarchart: RenderBarchartType = (
	conatiner,
	width,
	height,
	data
) => {
	const dataset = data
    
	const PADDING = 40
	const PADDING_SIDE = PADDING * 2
	const BAR_WIDTH = Math.floor((width - PADDING_SIDE * 2) / dataset.data.length) || 1

	d3.select("#chart-container")
        .selectAll("*")
        .remove()

	d3.select("#tooltip")
        .remove()

	const chart = d3
		.select("#chart-container")
		.append("svg")
		.attr("class", "chart-container")
		.attr("width", width)
		.attr("height", height)

	const tooltip = d3
		.select("body")
		.append("div")
        .attr('id', 'tooltip')
		.attr("class", styles.tooltip)
		.style("opacity", 0)

	const minXValue = d3.min(dataset.data, d => Date.parse(d[0].toString())) as number
	const maxXValue = d3.max(dataset.data, d => Date.parse(d[0].toString())) as number

	const xScale = d3
		.scaleTime()
		.domain([minXValue, maxXValue])
		.range([PADDING_SIDE, width - PADDING_SIDE])

	const maxYValue = d3.max(dataset.data, d => d[1]) as number

	const yScale = d3
		.scaleLinear()
		.domain([0, maxYValue])
		.range([height - PADDING, PADDING])

	const xAxis = d3.axisBottom(xScale)
	const yAxis = d3.axisLeft(yScale)

	chart
		.selectAll("rect")
		.data(dataset.data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("width", BAR_WIDTH)
		.attr("height", d => height - PADDING - yScale(d[1]))
		.attr("x", d => xScale(Date.parse(d[0].toString())))
		.attr("y", d => yScale(d[1]))
		.attr("data-date", d => d[0].toString())
		.attr("data-gdp", d => d[1])
		.attr("fill", "green")
		.on("mouseover", (event, d) => {
			tooltip
				.transition()
				.duration(300)
				.style("opacity", 0.9)
                
                tooltip
				.html("Date: " + d[0] + "<br/>" + "GDP: " + d[1])
				.style("left", event.clientX + "px")
				.style("top", event.clientY + "px")
		})
		.on("mouseout", d => {
			tooltip
				.transition()
				.duration(500)
				.style("opacity", 0)
		})

	chart
		.append("g")
		.attr("transform", `translate(0, ${height - PADDING})`)
		.attr("id", "x-axis")
		.call(xAxis)

	chart
		.append("g")
		.attr("transform", `translate(${PADDING_SIDE}, 0)`)
		.attr("id", "y-axis")
		.call(yAxis)

	chart
		.append("text")
		.text("United States GDP")
		.attr("width", 200)
		.attr("height", 50)
		.attr("x", width / 2)
		.attr("text-anchor", "middle")
		.attr("y", PADDING)
		.attr("id", "title")
}

export default renderBarchart
