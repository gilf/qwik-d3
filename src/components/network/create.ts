import * as d3 from "d3";
import { SimulationNodeDatum } from "d3";

export function createNetwork(
    elm: HTMLDivElement | undefined,
    data: {
        nodes: { id: number; name: string; }[],
        links: { source: number; target: number; }[]
    } | undefined,
    options: Record<string, any>,
) {
    if (!elm || !data) {
        return {
            unmount: () => {}
        };
    }

    const margin = {top: 10, right: 30, bottom: 30, left: 40};
    const { width, height } = elm.getBoundingClientRect();
    const networkWidth = width - margin.left - margin.right;
    const networkHeight = height - margin.top - margin.bottom;

    const svg = d3
        .select(elm)
        .append("svg")
        .attr("width", width)
        .attr("height",height)
        .append("g")
        .attr("transform",
            `translate(${margin.left},${margin.top})`);

    // Initialize the links
    const link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", options.linkStroke);

    // Initialize the nodes
    const node = svg
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", options.nodeR)
        .style("fill", options.nodeFill);

    // This function is run at each iteration of the force algorithm, updating the nodes position.
    const ticked = () => {
        link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);

        node
            .attr("cx", (d: any) => d.x + 6)
            .attr("cy", (d: any) => d.y - 6);
    }

    // Let's list the force we want to apply on the network
    const simulation = d3.forceSimulation(data.nodes as SimulationNodeDatum[])                 // Force algorithm is applied to data.nodes
        .force("link", d3.forceLink()                               // This force provides links between nodes
            .id((d: any) => { return d.id; })                     // This provides the id of a node
            .links(data.links)                                    // and this the list of links
        )
        .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force("center", d3.forceCenter(networkWidth / 2, networkHeight / 2))     // This force attracts nodes to the center of the svg area
        .on("tick", ticked);

    return {
        unmount: () => {
            simulation.stop();
            svg.remove();
        },
        node: svg.node()
    };
}