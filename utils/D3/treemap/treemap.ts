import * as d3 from "d3"
import styles from "./treemap.module.css"
import { Movie, RenderTreemapType } from "../../utils.types"

const renderTreemap: RenderTreemapType = (container, width, height, data) => {
	const dataset = data

	const W = width
	const H = height
    const PADDING = 40
    const PADDING_SIDE = PADDING * 2

	const LEGEND = [
		{
			fill: "#4C92C3",
			text: "Action",
		},
		{
			fill: "#BED2ED",
			text: "Adventure",
		},
		{
			fill: "#FF993E",
			text: "Comedy",
		},
		{
			fill: "#FFC993",
			text: "Drama",
		},
		{
			fill: "#56B356",
			text: "Animation",
		},
		{
			fill: "#ADE5A1",
			text: "Family",
		},
		{
			fill: "#DE5253",
			text: "Biography",
		},
	]

	const legendItemWidth = 100
	const legendItemHeight = 24
	const legendItemsInRow = 3
	const legendTextMarginTop = Math.floor(legendItemHeight / 2)
	const legendTextMarginLeft = 16 + 8

	const getLegendX = (index: number): number => {
		return legendItemWidth * (index % legendItemsInRow)
	}

	const getLegendY = (index: number): number => {
		return legendItemHeight * Math.floor(index / legendItemsInRow)
	}

	d3.select("#chart-container").selectAll("*").remove()

	d3.select("#tooltip").remove()

	const svg = d3
		.select("#chart-container")
		.append("svg")
		.attr("width", W)
		.attr("height", H)
		.attr("class", "chart-container")

	const tooltip = d3
		.select("body")
		.append("div")
		.attr("id", "tooltip")
		.attr("class", styles.tooltip)
		.style("opacity", 0)

    const hierarchy = d3.hierarchy(dataset)
    const root = hierarchy.sum(d => d.value)

    d3.treemap()
    .size([W - PADDING_SIDE * 2, H - PADDING * 4])
    .padding(0)
    (root)

    svg
    .selectAll('.tile')
    .data(root.leaves())
    .enter()
    .append('rect')
      .attr('class', 'tile')
      .attr('data-name', d => d.data.name)
      .attr('data-category', d => d.data.category)
      .attr('data-value', d => d.data.value)
      .attr('x', d => PADDING_SIDE + d.x0)
      .attr('y', d => PADDING * 1.5 + d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => LEGEND.find(genre => genre.text === d.data.category)?.fill ?? '#000000')
      .attr('stroke', 'white')
      .on('mouseover', (event, d) => {
        tooltip
          .transition()
          .duration(300)
          .style('opacity', 0.9)
          .attr('data-value', d.data.value)
        tooltip
          .style('left', event.clientX + 'px')
          .style('top', event.clientY + 'px')
          .html(`
            <strong>${d.data.name}</strong><br>
            Category: ${d.data.category}<br>
            Value: ${
              new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'USD'
                })
                .format(d.data.value)
            }
          `)
      })
      .on('mouseleave', () => {
        tooltip
          .transition()
          .duration(300)  
          .style('opacity', 0)
      })

      svg
      .append('text')
      .text('Movie Sales')
      .attr('x', W / 2)
      .attr('y', PADDING / 2)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('font-size', 20)
      .attr('id', 'title')
    
    svg
      .append('text')
      .text('Top 100 Highest Grossing Movies Grouped By Genre')
      .attr('x', W / 2)
      .attr('y', PADDING)
      .attr('text-anchor', 'middle')
      .attr('font-size', 8)
      .attr('id', 'description')
    
    const legendContainer = svg.append('g').attr('id', 'legend')
    
    legendContainer
      .selectAll('rect')
      .data(LEGEND)
      .enter()
      .append('rect') 
      .attr('class', 'legend-item')
      .attr('width', 16)
      .attr('height', 16)
      .attr('y', (d, i) => H - PADDING * 2 + getLegendY(i))
      .attr('x', (d, i) => W / 2 - legendItemWidth * 1.5 + getLegendX(i))
      .attr('fill', d => d.fill)
    
    legendContainer
      .selectAll('text')
      .data(LEGEND)
      .enter()
      .append('text')
      .text(d => d.text)
      .attr('font-size', 10)
      .attr('y', (d, i) => legendTextMarginTop + H - PADDING * 2 + getLegendY(i))
      .attr('x', (d, i) => legendTextMarginLeft + W / 2 - legendItemWidth * 1.5 + getLegendX(i)) 
}

export default renderTreemap
