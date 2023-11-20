import {$, component$} from "@builder.io/qwik";
import D3Container from "../d3-container/d3-container";
import { createBubblePlot } from "./create";

export type BubblePlotProps = {
    data: any[];
    xAxisDomain: number;
    yAxisDomain: number;
    zAxisDomain: number;
    cx: string;
    cy: string;
    r: string;
    fill?: string,
    stroke?: string,
    opacity?: number;
}

export default component$(({ data,
                               xAxisDomain,
                               yAxisDomain,
                               zAxisDomain,
                               cx,
                               cy,
                               r,
                               fill,
                               stroke,
                               opacity }: BubblePlotProps) => {
    const options = {
        xAxisDomain,
        yAxisDomain,
        zAxisDomain,
        cx,
        cy,
        r,
        fill,
        stroke,
        opacity
    };
    const handleCreation = $(createBubblePlot);
    return (
        <D3Container data={data} create={handleCreation} options={options} />
    );
});