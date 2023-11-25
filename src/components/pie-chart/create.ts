import * as d3 from "d3";
import {generateTooltip, removeTooltip} from "../../utils/tooltip-generator";

export function createPieChart(
    elm: HTMLDivElement | undefined,
    data: Object | undefined,
    options: Record<string, any>,
) {
    if (!elm || !data) {
        return {
            unmount: () => {}
        };
    }

    const margin = 40;
    const { width, height } = elm.getBoundingClientRect();
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select(elm)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet2);

    const pie = d3.pie()
        .value((d) => { return d[1]; });
    const dataReady = pie(Object.entries(data));

    const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Build the pie chart
    const pieSlices = svg
        .selectAll('slices')
        .data(dataReady)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', (d) => { return(color(d.data[0])); })
        .attr("stroke", options.stroke)
        .style("stroke-width", "1px")
        .style("opacity", options.opacity)

    // Add the annotation
    if (options.withLabels) {
         svg
            .selectAll('slices')
            .data(dataReady)
            .join('text')
            .text((d) => { return d.data[0]; })
            .attr("transform", (d) => { return `translate(${arcGenerator.centroid(d)})`;  })
            .style("text-anchor", "middle")
            .style("font-size", 16);
    }

    if (options.withTooltip) {
        const { addTooltip, tooltipElm } = generateTooltip('pie-chart-tooltip', 'tooltip');
        pieSlices.on("mouseover", (d, arc) => {
            console.log(d)
            addTooltip(arc.data[0], d.pageX, d.pageY);
        })
            .on("mouseout", () => {
                removeTooltip(tooltipElm);
            });
    }

    return {
        unmount: () => {
            svg.remove();
        },
        node: svg.node()
    };
}