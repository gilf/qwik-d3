import * as d3 from "d3";

export const generateTooltip = (tooltipElmId: string, tooltipClassName: string) => {
    // Add the tooltip element to the graph if not exists
    const tooltip = document.querySelector(`#${tooltipElmId}`);
    if (!tooltip) {
        const tooltipDiv = document.createElement("div");
        tooltipDiv.classList.add(tooltipClassName);
        tooltipDiv.style.opacity = "0";
        tooltipDiv.style.position = "absolute";
        tooltipDiv.id = tooltipElmId;
        document.body.appendChild(tooltipDiv);
    }
    const div = d3.select(`#${tooltipElmId}`);

    const addTooltip = (d: any, x: number, y: number) => {
        div
            .transition()
            .duration(200)
            .style("opacity", 0.9);
        div
            .html(`<div class="tooltip-content">${d}</div>`)
            .style("left", `${x}px`)
            .style("top", `${y - 28}px`);
    };

    const removeTooltip = () => {
        div
            .transition()
            .duration(200)
            .style("opacity", 0);
    };

    return { addTooltip, removeTooltip, tooltipElm: div };
}