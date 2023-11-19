import * as d3 from "d3";

export type tSymbol = {
    id: number;
    sessionId: string;
    symbol: string;
    previousSymbol: string;
    load: number;
    delayTime: number;
    deltaInteraction: boolean;
}

export type Node = {
    id?: number,
    children: Node[],
    name: string,
    value?: string
}

function processSymbols(symbols: tSymbol[] | undefined) {
    const map = new Map<string, Node>();

    const result: Node = {
        name: 'root',
        children: []
    };

    symbols?.forEach((symbol) => {
        const node = {
            id: symbol.id,
            children: [],
            name: symbol.symbol,
            value: `load: ${symbol.load}, delay time: ${symbol.delayTime}`
        }

        if (!map.has(symbol.previousSymbol)) {
            map.set(symbol.symbol, node);
        } else {
            const prev = map.get(symbol.previousSymbol);
            if (prev) {
                prev.children.push(node);
                map.set(symbol.previousSymbol, prev);
            }
        }
    });

    for (const value of map.values()){
        result.children.push(value);
    }

    return result;
}

export function createGraph(
    elm: HTMLDivElement | undefined,
    data: tSymbol[] | undefined,
) {
    if (!elm) {
        return {
            destroy: () => {}
        };
    }
    const processedData = processSymbols(data);

    const { width } = elm.getBoundingClientRect();

    const root = d3.hierarchy(processedData);
    const dx = 10;
    const dy = width / (root.height + 1);

    // Create a tree layout.
    const tree = d3.tree().nodeSize([dx, dy]);

    // Sort the tree and apply the layout.
    root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
    tree(root);

    // Compute the extent of the tree. Note that x and y are swapped here
    // because in the tree layout, x is the breadth, but when displayed, the
    // tree extends right rather than down.
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

    // Compute the adjusted height of the tree.
    const height = x1 - x0 + dx * 2;

    const svg = d3
        .select(elm)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-dy / 3, x0 - dx, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll()
        .data(root.links())
        .join("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    const node = svg.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll()
        .data(root.descendants())
        .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("fill", d => d.children ? "#555" : "#999")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children ? -6 : 6)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name)
        .clone(true).lower()
        .attr("stroke", "white");

    return {
        destroy: () => {
            console.log('clean up!');
        },
        node: svg.node()
    };
}