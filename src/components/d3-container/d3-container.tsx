import {component$, QRL, useSignal, useVisibleTask$} from "@builder.io/qwik";
import styles from "./d3-container.module.css";

export type GraphContainerProps = {
    data: any[];
    create: QRL<(elm: HTMLDivElement | undefined, data: any[] | undefined) => { destroy: () => void, node: SVGSVGElement | null }>;
}

export default component$(({ data, create }: GraphContainerProps) => {
    const containerRef = useSignal<HTMLDivElement>();

    useVisibleTask$(async ({ cleanup }) => {
        const { destroy } = await create(containerRef.value, data);
        cleanup(() => destroy());
    });

    return (
        <div ref={containerRef} class={styles.container} />
    );
});
