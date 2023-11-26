import {$, component$} from "@builder.io/qwik";
import D3Container from "../d3-container/d3-container";
import { createBarPlot } from "./create";

export type BarPlotProps = {
    data: any[];
    yAxisDomain: number[];
    xAxis: string;
    fill?: string,
}

export default component$(({ data,
                               yAxisDomain,
                               xAxis,
                               fill }: BarPlotProps) => {
    const options = {
        yAxisDomain,
        xAxis,
        fill,
    };
    const handleCreation = $(createBarPlot);
    return (
        <D3Container data={data} create={handleCreation} options={options} />
    );
});