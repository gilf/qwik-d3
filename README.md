# qwik-d3 ⚡️

![qwik-d3](/images/qwik-d3-small.jpg)
A small library that exposes a d3 container. You can use the container in order to incorporate d3 generated visualization inside your qwik project.

---

## Installation

You can run 
```
npm i qwik-d3 
```
Make sure that you also install d3 library because it's a peer dependency.

## Usage

The library exposes a component named D3Container.
The component expects two props:
- data - the data that should be used inside the graph. 
- create - a QRL function that will be responsible to create the d3 visualization inside the container.
- options - a Record<string, string> that is used to pass configurations to the create function

For example inside your qwik component you have a list and a createGraph QRL:

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
    { country: "Cambodia", continent: "Asia", lifeExp: 59.723, pop: 14131858, gdpPercap: 1713.778686 },
    { country: "China", continent: "Asia", lifeExp: 72.961, pop: 1318683096, gdpPercap: 4959.114854 },
    { country: "Pakistan", continent: "Asia", lifeExp: 65.483, pop: 169270617, gdpPercap: 2605.94758 },
    { country: "United States", continent: "Americas", lifeExp: 78.242, pop: 301139947, gdpPercap: 42951.65309 }
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
    { price: 70 },
    { price: 70 },
    { price: 100 },
    { price: 70 },
    { price: 15 },
    { price: 69 },
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
const barPlotData = [{ country: 'USA', value: 12394 }, { country: 'Russia', value: 6148 }, { country: 'UK', value: 1214 }];
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
        {
            "id": 3,
            "name": "C"
        },
        {
            "id": 4,
            "name": "D"
        },
        {
            "id": 5,
            "name": "E"
        },
        {
            "id": 6,
            "name": "F"
        },
        {
            "id": 7,
            "name": "G"
        },
        {
            "id": 8,
            "name": "H"
        },
        {
            "id": 9,
            "name": "I"
        },
        {
            "id": 10,
            "name": "J"
        }
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
        {
            "source": 1,
            "target": 6
        },

        {
            "source": 2,
            "target": 3
        },
        {
            "source": 2,
            "target": 7
        }
        ,

        {
            "source": 3,
            "target": 4
        },
        {
            "source": 8,
            "target": 3
        }
        ,
        {
            "source": 4,
            "target": 5
        }
        ,

        {
            "source": 4,
            "target": 9
        },
        {
            "source": 5,
            "target": 10
        }
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
}, {
    date: '2013-04-30',
    value: 146.93,
}, {
    date: '2013-05-01',
    value: 139.89,
}, {
    date: '2013-05-02',
    value: 143.89,
}, {
    date: '2013-05-03',
    value: 167.12,
}, {
    date: '2013-05-04',
    value: 123.12,
}];
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