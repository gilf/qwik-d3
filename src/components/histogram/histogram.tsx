import {$, component$} from "@builder.io/qwik";
import D3Container from "../d3-container/d3-container";
import { createHistogram } from "./create";

export type HistogramProps = {
    data: any[];
    xAxisDomain: number;
    yAxisDomain: number;
    fill?: string,
    thresholds: number;
    column: string;
}

export default component$(({ data,
                               xAxisDomain,
                               yAxisDomain,
                               fill,
                               thresholds,
                               column }: HistogramProps) => {
    const options = {
        xAxisDomain,
        yAxisDomain,
        fill,
        thresholds,
        column
    };
    const handleCreation = $(createHistogram);
    return (
        <D3Container data={data} create={handleCreation} options={options} />
    );
});