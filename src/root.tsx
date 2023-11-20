import D3Container from "./components/d3-container/d3-container";
import { createGraph } from "./utils/utils";
import { $ } from "@builder.io/qwik";
import BubblePlot from "./components/bubble-plot/bubble-plot";

import styles from './styles.module.css';
import Histogram from "./components/histogram/histogram";
import {histogram} from "d3";

export default () => {
    const list = [
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
    const bubbleArr = [
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
    const handleCreation = $(createGraph);
    return (
        <>
          <head>
            <meta charSet="utf-8" />
            <title>D3 Integration Demo</title>
          </head>
          <body>
            <section class={styles.main}>
                <D3Container data={list} create={handleCreation} options={{}} />
                <BubblePlot data={bubbleArr} xAxisDomain={[0, 10000]} yAxisDomain={[0, 90]} zAxisDomain={[0, 1310000000]}
                            cx="gdpPercap" cy="lifeExp" r="pop" fill="#69b3a2" stroke="black" opacity={0.7} />
                <Histogram data={histogramData} column="price" xAxisDomain={[0, 150]} fill="#69b3a2" thresholds={70} />
            </section>
          </body>
        </>
    );
};
