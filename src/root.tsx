import D3Container from "./components/d3-container/d3-container";
import {createGraph} from "./utils/utils";
import {$} from "@builder.io/qwik";

export const list = [
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

export default () => {
    const handleCreation = $(createGraph);
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <D3Container data={list} create={handleCreation} />
      </body>
    </>
  );
};
