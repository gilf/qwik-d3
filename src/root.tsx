import { $ } from "@builder.io/qwik";
import BubblePlot from "./components/bubble-plot/bubble-plot";
import Histogram from "./components/histogram/histogram";
import PieChart from "./components/pie-chart/pie-chart";
import BarPlot from "./components/bar-plot/bar-plot";
import Network from "./components/network/network";
import D3Container from "./components/d3-container/d3-container";
import { createGraph } from "./utils/utils";

import styles from './styles.module.css';
import LineChart from "./components/line-chart/line-chart";

export default () => {
    const data = [
        {
            id: 1,
            sessionId: 'lmlv6nkqbhe',
            symbol: '_hW',
            previousSymbol: '',
            load: 384,
            delayTime: 928,
            deltaInteraction: true
        },
        {
            id: 2,
            sessionId: 'lmlv6nkqbhe',
            symbol: 'Header_component_useVisibleTask_9t1uPE4yoLA',
            previousSymbol: '_hW',
            load: 0,
            delayTime: 34,
            deltaInteraction: false
        },
        {
            id: 3,
            sessionId: 'lmlv6nkqbhe',
            symbol: 'DocSearch_component_div_window_onKeyDown_uCl5Lf0Typ8',
            previousSymbol: '',
            load: 36,
            delayTime: 1568,
            deltaInteraction: true
        },
        {
            id: 4,
            sessionId: 'lmlv6nkqbhe',
            symbol: 'Header_component__Fragment_header_div_button_onClick_S0wV0vUzzSo',
            previousSymbol: '',
            load: 24,
            delayTime: 80941,
            deltaInteraction: true
        },
        {
            id: 5,
            sessionId: 'lmlv6nkqbhe',
            symbol: 'DocSearch_component_div_DocSearchButton_onClick_I5CyQjO9FjQ',
            previousSymbol: '',
            load: 11,
            delayTime: 2893,
            deltaInteraction: true
        },
        {
            id: 6,
            sessionId: 'lmlv6nkqbhe',
            symbol: 'DocSearch_component_NsnidK2eXPg',
            previousSymbol: 'DocSearch_component_div_DocSearchButton_onClick_I5CyQjO9FjQ',
            load: 47,
            delayTime: 1,
            deltaInteraction: false
        },
        {
            id: 7,
            sessionId: 'lmlv6nkqbhe',
            symbol: 'DocSearchModal_component_kDw0latGeM0',
            previousSymbol: 'DocSearch_component_NsnidK2eXPg',
            load: 299,
            delayTime: 4,
            deltaInteraction: false
        },
        {
            id: 8,
            sessionId: 'lmlv6nkqbhe',
            symbol: 'SearchBox_component_7YcOLMha9lM',
            previousSymbol: 'DocSearchModal_component_kDw0latGeM0',
            load: 398,
            delayTime: 2,
            deltaInteraction: false
        },
        {
            id: 9,
            sessionId: 'lmlv6nkqbhe',
            symbol: 'ScreenState_component_Ly5oFWTkofs',
            previousSymbol: 'SearchBox_component_7YcOLMha9lM',
            load: 408,
            delayTime: -397,
            deltaInteraction: false
        },
        {
            id: 10,
            sessionId: 'lmlv6nkqbhe',
            symbol: 'AIButton_component_NCpn2iO0Vo0',
            previousSymbol: 'ScreenState_component_Ly5oFWTkofs',
            load: 738,
            delayTime: -409,
            deltaInteraction: false
        },
    ];
    const bubbleData = [
        { country: "Afghanistan", continent: "Asia", lifeExp: 43.828, pop: 31889923, gdpPercap: 974.5803384 },
        { country: "Albania",continent: "Europe", lifeExp:76.423, pop: 3600523, gdpPercap: 5937.029526 },
        { country: "Cambodia", continent: "Asia", lifeExp: 59.723, pop: 14131858, gdpPercap: 1713.778686 },
        { country: "China", continent: "Asia", lifeExp: 72.961, pop: 1318683096, gdpPercap: 4959.114854 },
        { country: "Pakistan", continent: "Asia", lifeExp: 65.483, pop: 169270617, gdpPercap: 2605.94758 },
        { country: "United States", continent: "Americas", lifeExp: 78.242, pop: 301139947, gdpPercap: 42951.65309 }
    ];
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
    const barPlotData = [{ country: 'USA', value: 12394 }, { country: 'Russia', value: 6148 }, { country: 'UK', value: 1214 }];
    const pieData = {a: 9, b: 20, c:30, d:8, e:12};
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

    const handleCreation = $(createGraph);
    return (
        <>
          <head>
            <meta charSet="utf-8" />
            <title>D3 Integration Demo</title>
          </head>
          <body>
            <section class={styles.main}>
                <D3Container data={data} create={handleCreation} options={{}} />
                <BarPlot data={barPlotData} yAxisDomain={[0, 13000]} fill="#69b3a2" xAxis="country"  />
                <BubblePlot data={bubbleData} xAxisDomain={[0, 10000]} yAxisDomain={[0, 90]} zAxisDomain={[0, 1310000000]}
                            cx="gdpPercap" cy="lifeExp" r="pop" fill="#69b3a2" stroke="black" opacity={0.7} />
                <Histogram data={histogramData} column="price" xAxisDomain={[0, 150]} fill="#69b3a2" thresholds={70} />
                <PieChart data={pieData} withLabels withTooltip stroke="black" opacity={0.7} />
                <Network data={networkData} linkStroke="#aaa" nodeFill="#69b3a2" nodeR={20} />
                <LineChart data={lineChartData} stroke="steelblue" strokeWidth={1.5} />
            </section>
          </body>
        </>
    );
};
