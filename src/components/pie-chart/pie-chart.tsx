import {$, component$} from "@builder.io/qwik";
import D3Container from "../d3-container/d3-container";
import { createPieChart } from "./create";

export type PieChartProps = {
    data: Object;
    withLabels?: boolean;
    stroke?: string;
    opacity?: number;
}

export default component$(({ data, withLabels, stroke, opacity }: PieChartProps) => {
    const options = {
        stroke,
        opacity,
        withLabels
    };
    const handleCreation = $(createPieChart);
    return (
        <D3Container data={data} create={handleCreation} options={options} />
    );
});