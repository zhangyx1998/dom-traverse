# DOM Traverse Utility

## Example (Browser)

### 1. Basic traverse

```js
import traverse from "dom-traverse";
// Analogous to document.querySelectAll('*')
for (const node of traverse(document.body, Node.ELEMENT_NODE)) {
  // Do something ...
}
```

### 2. Skippable traverse - ignore part of the DOM

```js
import traverse from "dom-traverse";

for (const [node, skip] of traverse.skippable(
  document.body,
  Node.ELEMENT_NODE
)) {
  if (node.tagName === "H1") {
    // Do something ...
  } else {
    // Child elements of this node will NOT be iterated.
    skip();
  }
}
```

## Use with Node.JS

```js
// interface `Node` is not available in NodeJS
import traverse, { Node } from "dom-traverse";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<html><!-- your html content --></html>");

for (const node of traverse(dom.window.body, Node.ELEMENT_NODE)) {
  // Do something ...
}
```
