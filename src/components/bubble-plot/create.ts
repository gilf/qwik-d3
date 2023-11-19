import * as d3 from "d3";

export function createBubblePlot(
    elm: HTMLDivElement | undefined,
    data: any[] | undefined,
    options: Record<string, any>,
) {
    if (!elm || !data) {
        return {
            destroy: () => {}
        };
    }

    const margin = {top: 10, right: 20, bottom: 30, left: 50}
    const { width, height } = elm.getBoundingClientRect();
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const svg = d3
        .select(elm)
        .append("svg")
        .attr("width", width)
        .attr("height",height)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
        .domain([0, options.xAxisDomain])
        .range([ 0, plotWidth ]);
    svg.append("g")
        .attr("transform", "translate(0," + plotHeight + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, options.yAxisDomain])
        .range([ plotHeight, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add a scale for bubble size
    const z = d3.scaleLinear()
        .domain([0, options.zAxisDomain])
        .range([ 1, 40]);

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx",  (d) => { return x(d[options.cx]); } )
        .attr("cy",  (d) => { return y(d[options.cy]); } )
        .attr("r", (d) => { return z(d[options.r]); } )
        .style("fill", options.fill)
        .style("opacity", options.opacity)
        .attr("stroke", options.stroke)

    return {
        destroy: () => {
            svg.remove();
        },
        node: svg.node()
    };
}