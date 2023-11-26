import * as d3 from "d3";

export function createBarPlot(
    elm: HTMLDivElement | undefined,
    data: any[] | undefined | Record<string, any>,
    options: Record<string, any>,
) {
    if (!elm || !data || !Array.isArray(data)) {
        return {
            unmount: () => {}
        };
    }

    const margin = {top: 10, right: 20, bottom: 90, left: 50}
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
            `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .range([0, plotWidth])
        .domain(data.map((d) => { return d[options.xAxis]; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", `translate(0,${plotHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain(options.yAxisDomain)
        .range([ plotHeight, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => { return x(d[options.xAxis]) as any; })
        .attr("width", x.bandwidth())
        .attr("fill", options.fill)
        // no bar at the beginning thus:
        .attr("height", () => { return plotHeight - y(0); }) // always equal to 0
        .attr("y", () => { return y(0); });

    // Animation
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", (d: any) => { return y(d?.value); })
        .attr("height", (d: any) => { return plotHeight - y(d?.value); })
        .delay((d,i) => { return(i * 100); });

    return {
        unmount: () => {
            svg.remove();
        },
        node: svg.node()
    };
}