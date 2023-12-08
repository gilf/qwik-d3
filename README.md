# qwik-d3 ⚡️

<img src="https://github.com/gilf/qwik-d3/blob/main/images/qwik-d3-small.jpg" alt="qwik-d3" width="124px" height="124px">
A small library that exposes a D3.js container. You can use the container in order to incorporate D3.js generated visualization inside your Qwik project.

---

## Installation

You can run 
```
npm i qwik-d3 
```
Make sure that you also install d3 library because it's a peer dependency.

## Usage

The library exposes a component named D3Container.
The component expects three props:
- data - the data that should be used inside the graph. 
- create - a QRL function that will be responsible to create the d3 visualization inside the container.
- options - a Record<string, string> that is used to pass configurations to the create function

For example inside your Qwik component you have a list and a createGraph QRL:

```jsx
const data = [...];
const handleCreation = $(createGraph);
return (
    <D3Container data={data} create={handleCreation} options={{ fill: 'black' }} />
);
```

## Other Exposed Components
### BubblePlot 
Pre-made bubble plot diagram with a few configuration options such as cx, cy and r for the size of the bubbles.
```jsx
const bubbleData = [
    { country: "Afghanistan", continent: "Asia", lifeExp: 43.828, pop: 31889923, gdpPercap: 974.5803384 },
    { country: "Albania",continent: "Europe", lifeExp:76.423, pop: 3600523, gdpPercap: 5937.029526 },
    ...
];
return (
    <BubblePlot data={bubbleData} xAxisDomain={[0, 10000]} yAxisDomain={[0, 90]} zAxisDomain={[0, 1310000000]}
            cx="gdpPercap" cy="lifeExp" r="pop" fill="#69b3a2" stroke="black" opacity={0.7} />
);
```
### Histogram
Pre-made histogram graph with options to set the thresholds and column in the single object.
```jsx
const histogramData = [
    { price: 100 },
    { price: 70 },
    ...
];
return (
    <Histogram data={histogramData} column="price" xAxisDomain={[0, 150]} fill="#69b3a2" thresholds={70} />
);
```
### PieChart
Pre-made pie chart. 
```jsx
const pieData = {a: 9, b: 20, c:30, d:8, e:12}; 
return (<PieChart data={pieData} withLabels withTooltip stroke="black" opacity={0.7} />);
```
### BarPlot
Pre-made bar plot.
```jsx
const barPlotData = [{ country: 'USA', value: 12394 },
    { country: 'Russia', value: 6148 }, 
    { country: 'UK', value: 1214 }
];
return (
    <BarPlot data={barPlotData} yAxisDomain={[0, 13000]} fill="#69b3a2" xAxis="country" />
);
```
### Network
Pre-made network diagram.
```jsx
const networkData = {
    "nodes": [
        {
            "id": 1,
            "name": "A"
        },
        {
            "id": 2,
            "name": "B"
        },
        ...
    ],
    "links": [
        {
            "source": 1,
            "target": 2
        },
        {
            "source": 1,
            "target": 5
        },
        ...
    ]
};
return (
    <Network data={networkData} linkStroke="#aaa" nodeFill="#69b3a2" nodeR={20} />
);
```
### LineChart
Pre-made line chart.
```jsx
const lineChartData = [{
    date: '2013-04-28',
    value: 135.98,
}, {
    date: '2013-04-29',
    value: 147.49,
}, ...];
return (
    <LineChart data={lineChartData} stroke="steelblue" strokeWidth={1.5} />
);
```
### generateTooltip 
A helper function that helps to add a tooltip without any style to a d3 generated visualization.

In the next example pieSlices is the d3 generated pie slices in a pie chart: 
```javascript
if (options.withTooltip) {
    const { addTooltip, removeTooltip } = generateTooltip("pie-chart-tooltip", "tooltip");
    pieSlices.on("mouseover", (d, arc: any) => {
        addTooltip(arc.data[0], d.pageX, d.pageY);
    }).on("mouseout", () => {
        removeTooltip();
    });
}
```
The function accepts two arguments:
- A unique id for the tooltip
- A class name to add to the generated tooltip which can be used to style the tooltip element.