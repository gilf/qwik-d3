import {component$, type QRL, useSignal, useStylesScoped$, useVisibleTask$} from "@builder.io/qwik";
import styles from "./d3-container.css?inline";

export type D3ContainerProps = {
    data: any[];
    create:  QRL<(elm: (HTMLDivElement | undefined), data: (any[] | undefined)) => ({destroy: () => void, node?: undefined} | {destroy: () => void, node: SVGSVGElement | null})>;
}

export default component$(({ data, create }: D3ContainerProps) => {
    useStylesScoped$(styles);
    const containerRef = useSignal<HTMLDivElement>();

    useVisibleTask$(async ({ cleanup }) => {
        const { destroy } = await create(containerRef.value, data);
        cleanup(() => destroy());
    });

    return (
        <div ref={containerRef} class="container" />
    );
});
