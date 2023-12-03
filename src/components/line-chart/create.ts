import * as d3 from "d3";
import {NumberValue} from "d3";

const transformData = (d: any) => {
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
};

export function createLineChart(
    elm: HTMLDivElement | undefined,
    data: any[] | undefined | Record<string, any>,
    options: Record<string, any>,
) {
    if (!elm || !data || !Array.isArray(data)) {
        return {
            unmount: () => {}
        };
    }

    const transformedData = data.map((d: any) => { return transformData(d); });

    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const { width, height } = elm.getBoundingClientRect();
    const lineChartWidth = width - margin.left - margin.right;
    const lineChartHeight = height - margin.top - margin.bottom;

    const svg = d3
        .select(elm)
        .append("svg")
        .attr("width", width)
        .attr("height",height)
        .append("g")
        .attr("transform",
            `translate(${margin.left},${margin.top})`);

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
        .domain(d3.extent(transformedData, (d: any) => { return d.date; }) as Iterable<Date | NumberValue>)
        .range([ 0, lineChartWidth ]);
    svg.append("g")
        .attr("transform", "translate(0," + lineChartHeight + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(transformedData, (d: any) => { return +d.value; }) as number])
        .range([ lineChartHeight, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
        .datum(transformedData)
        .attr("fill", "none")
        .attr("stroke", options.stroke)
        .attr("stroke-width", options.strokeWidth)
        .attr("d", d3.line()
            .x((d: any) => { return x(d.date); })
            .y((d: any) => { return y(d.value); })
        );

    return {
        unmount: () => {
            svg.remove();
        },
        node: svg.node()
    };
}