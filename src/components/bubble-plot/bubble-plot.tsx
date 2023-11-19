import {$, component$} from "@builder.io/qwik";
import D3Container from "../d3-container/d3-container";
import { createBubblePlot } from "./create";

export type BubblePlotProps = {
    data: any[];
    options: Record<string, any>,
}

export default component$(({ data, options }: BubblePlotProps) => {
    const handleCreation = $(createBubblePlot);
    return (
        <D3Container data={data} create={handleCreation} options={options} />
    );
});