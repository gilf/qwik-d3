import {component$, type QRL, useSignal, useStylesScoped$, useVisibleTask$} from "@builder.io/qwik";
import styles from "./d3-container.css?inline";

export type D3ContainerProps = {
    data: any[];
    create: QRL<(elm: (HTMLDivElement | undefined), data: (any[] | undefined), options: Record<string, any>) => ({destroy: () => void, node?: undefined} | {destroy: () => void, node: SVGGElement | null})>;
    options: Record<string, any>;
}

export default component$(({ data, create, options }: D3ContainerProps) => {
    useStylesScoped$(styles);
    const containerRef = useSignal<HTMLDivElement>();

    useVisibleTask$(async ({ cleanup }) => {
        const { destroy } = await create(containerRef.value, data, options);
        cleanup(() => destroy());
    });

    return (
        <div ref={containerRef} class="container" />
    );
});
