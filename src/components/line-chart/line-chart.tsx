import {$, component$} from "@builder.io/qwik";
import D3Container from "../d3-container/d3-container";
import { createLineChart } from "./create";

export type LineChartProps = {
    data: any[];
    stroke?: string;
    strokeWidth?: number;
}

export default component$(({ data, stroke, strokeWidth }: LineChartProps) => {
    const options = {
        stroke,
        strokeWidth,
    };
    const handleCreation = $(createLineChart);
    return (
        <D3Container data={data} create={handleCreation} options={options} />
    );
});