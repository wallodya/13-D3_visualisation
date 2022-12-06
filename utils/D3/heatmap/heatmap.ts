import * as d3 from "d3"
import { RenderHeatmapType } from "../../utils.types"
import styles from "./heatmap.module.css"

const renderHeatmap: RenderHeatmapType = (container, width, height, data) => {
	const dataset = data
	const BASE_TEMP = dataset.baseTemperature

	const LEGEND_VALUES = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7] as const

	const W = width
	const H = height
	const PADDING = 50
	const PADDING_SIDE = PADDING * 2 
    const RECT_WIDTH = 4

	const MONTH_NAMES = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]

	const pickColor = (value: number): string => {
		switch (true) {
			case value >= 11.7:
				return "#A50026"
			case value >= 10.6:
				return "#D73027"
			case value >= 9.5:
				return "#F46D43"
			case value >= 8.3:
				return "#FDAE61"
			case value >= 7.2:
				return "#FEE090"
			case value >= 6.1:
				return "#E0F3F8"
			case value >= 5.0:
				return "#ABD9E9"
			case value >= 3.9:
				return "#74ADD1"
			case value >= 2.8:
				return "#4575B4"
			default:
				return "#000000"
		}
	}

	d3.select("#chart-container").selectAll("*").remove()

	d3.select("#tooltip").remove()

	const heatmap = d3
		.select("#chart-container")
		.append("svg")
		.attr("width", W)
		.attr("height", H)
		.attr("class", "chart-container")

	const tooltip = d3
		.select("body")
		.append("div")
		.attr("class", styles.tooltip)
		.attr("id", "tooltip")
		.style("opacity", 0)

	const minXValue = d3.min(dataset.monthlyVariance, d => d.year) as number
	const maxXValue = d3.max(dataset.monthlyVariance, d => d.year) as number
	const xScale = d3
		.scaleLinear()
		.domain([minXValue, maxXValue])
		.range([PADDING_SIDE, W - PADDING_SIDE])

	const yScale = d3
		.scaleBand()
		.domain(MONTH_NAMES)
		.range([PADDING, H - PADDING * 3])
        .round(true)

	const xAxis = d3
        .axisBottom(xScale)

	const yAxis = d3
		.axisLeft(yScale)		// .tickFormat(value => MONTH_NAMES[+value - 1])

	heatmap
		.selectAll("rect")
		.data(dataset.monthlyVariance)
		.enter()
		.append("rect")
		.attr("class", "cell")
		.attr("x", d => xScale(d.year))
		.attr("y", d => yScale(MONTH_NAMES[d.month - 1]) as number)
		.attr("width", d => xScale(d.year) - xScale(d.year - 1))
		.attr("height", yScale.bandwidth())
		.attr("data-month", d => d.month - 1)
		.attr("data-year", d => d.year)
		.attr("data-temp", d => BASE_TEMP + d.variance)
		.attr("fill", d => pickColor(BASE_TEMP + d.variance))
		.on("mouseover", (event, d) => {
			tooltip
				.transition()
				.duration(300)
				.style("opacity", 0.9)
				.attr("data-year", d.year)
			tooltip
				.html(
					`
                <strong>${d.year}, ${MONTH_NAMES[d.month - 1]}</strong><br>
                Temp: ${(BASE_TEMP + d.variance).toPrecision(3)}℃<br>
                Variance: ${d.variance}℃`
				)
				.style("left", event.clientX + "px")
				.style("top", event.clientY + "px")
		})
		.on("mouseout", (event, d) => {
			tooltip.transition().duration(300).style("opacity", 0)
		})

	heatmap
		.append("text")
		.text("Monthly Global Land-Surface Temperature")
		.attr("x", W / 2)
		.attr("y", PADDING / 2 - 5)
		.attr("text-anchor", "middle")
		.attr("fonnt-size", 14)
		.attr("font-weight", "bold")
		.attr("id", "title")
	heatmap
		.append("text")
		.text(`1753 - 2015: base temperature ${BASE_TEMP}℃`)
		.attr("x", W / 2)
		.attr("y", PADDING - 10)
		.attr("text-anchor", "middle")
		.attr("font-size", 12)
		.attr("id", "description")
	heatmap
		.append("text")
		.text("Months")
		.attr(
			"transform",
			`translate(${PADDING / 2}, ${H / 2 - PADDING})rotate(270)`
		)
		.attr("text-anchor", "middle")
		.attr("font-size", 10)
	heatmap
		.append("g")
		.call(xAxis)
		.attr("id", "x-axis")
		.attr("transform", `translate(0, ${H - PADDING * 3})`)
	heatmap
		.append("g")
		.call(yAxis)
		.attr("id", "y-axis")
		.attr("transform", `translate(${PADDING_SIDE}, 0)`)

	const legendScale = d3
		.scaleLinear()
		.domain([1.7, 13.9])
		.range([PADDING_SIDE, PADDING_SIDE + 330])

	const legendAxis = d3
		.axisBottom(legendScale)
		.tickValues([...LEGEND_VALUES, 12.8])
		.tickFormat(d3.format(".1f"))

	heatmap
		.append("g")
		.call(legendAxis)
		.attr("transform", `translate(0, ${H - PADDING})`)

	heatmap
		.append("g")
		.attr("id", "legend")
		.selectAll(".legend-rect")
		.data(LEGEND_VALUES)
		.enter()
		.append("rect")
		.attr("class", "legend-rect")
		.attr("fill", d => pickColor(d))
		.attr("x", d => legendScale(d))
		.attr("y", H - PADDING - 30)
		.attr("width", d => (d === 8.3 ? 34 : 30))
		.attr("height", 30)
}

export default renderHeatmap
