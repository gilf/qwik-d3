import {component$, type QRL, useSignal, useStylesScoped$, useVisibleTask$} from "@builder.io/qwik";
import styles from "./d3-container.css?inline";

export type D3ContainerProps = {
    data: any[] | Record<string, any> | object;
    create: QRL<(elm: HTMLDivElement | undefined, data: any[] | undefined | object, options: Record<string, any>) => { unmount: () => void; node?: undefined; } | { unmount: () => void; node: SVGGElement | null; }>;
    options: Record<string, any>;
}

export default component$(({ data, create, options }: D3ContainerProps) => {
    useStylesScoped$(styles);
    const containerRef = useSignal<HTMLDivElement>();

    useVisibleTask$(async ({ cleanup }) => {
        const { unmount } = await create(containerRef.value, data, options);
        cleanup(() => unmount());
    });

    return (
        <div ref={containerRef} class="container" />
    );
});
