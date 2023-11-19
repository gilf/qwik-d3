# qwik-d3 ⚡️

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

For example inside your qwik component you have a list and a createGraph QRL:

```
const list = [...];
const handleCreation = $(createGraph);
return (
    <D3Container data={list} create={handleCreation} />
);
```
