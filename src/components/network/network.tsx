import {$, component$} from "@builder.io/qwik";
import D3Container from "../d3-container/d3-container";
import { createNetwork } from "./create";

export type NetworkProps = {
    data: {
        nodes: { id: number; name: string; }[],
        links: { source: number; target: number; }[]
    };
    nodeFill?: string;
    nodeR?: number;
    linkStroke?: string;
}

export default component$(({ data, nodeFill, nodeR = 20, linkStroke }: NetworkProps) => {
    const options = {
        nodeFill,
        nodeR,
        linkStroke,
    };
    const handleCreation = $(createNetwork);
    return (
        <D3Container data={data} create={handleCreation} options={options} />
    );
});