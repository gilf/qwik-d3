import * as d3 from "d3";

export function createHistogram(
    elm: HTMLDivElement | undefined,
    data: any[] | undefined | Record<string, any>,
    options: Record<string, any>,
) {
    if (!elm || !data || !Array.isArray(data)) {
        return {
            unmount: () => {}
        };
    }

    const margin = {top: 10, right: 20, bottom: 30, left: 50}
    const { width, height } = elm.getBoundingClientRect();
    const histogramWidth = width - margin.left - margin.right;
    const histogramHeight = height - margin.top - margin.bottom;

    const svg = d3
        .select(elm)
        .append("svg")
        .attr("width", width)
        .attr("height",height)
        .append("g")
        .attr("transform",
            `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain(options.xAxisDomain)
        .range([ 0, histogramWidth ]);
    svg.append("g")
        .attr("transform", `translate(0, ${histogramHeight})`)
        .call(d3.axisBottom(x));

    // set the parameters for the histogram
    const histogram = d3.bin()
        .value((d: any) => { return d[options.column]; })   // I need to give the vector of value
        .domain(x.domain() as [number, number])  // then the domain of the graphic
        .thresholds(x.ticks(options.thresholds)); // then the numbers of bins

    // And apply this function to data to get the bins
    const bins = histogram(data);

    // Add Y axis
    const y = d3.scaleLinear()
        .range([ histogramHeight, 0])
    y.domain([0, d3.max(bins, (d) => { return d?.length; }) as number]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", (d: any) => { return `translate(${x(d.x0)},${y(d?.length)})`; })
        .attr("width", (d: any) => { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", (d) => { return histogramHeight - y(d?.length); })
        .style("fill", options.fill)

    return {
        unmount: () => {
            svg.remove();
        },
        node: svg.node()
    };
}