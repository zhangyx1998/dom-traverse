/* ---------------------------------------------------------
 * Copyright (c) 2023 Yuxuan Zhang, web-dev@z-yx.cc
 * This source code is licensed under the MIT license.
 * You may find the full license in project root directory.
 * ------------------------------------------------------ */

// Node type constants
export const Node = Object.freeze({
  // An Element node like <p> or <div>.
  ELEMENT_NODE: 1,
  // An Attribute of an Element.
  ATTRIBUTE_NODE: 2,
  // The actual Text inside an Element or Attr.
  TEXT_NODE: 3,
  // A CDATASection, such as <!CDATA[[ … ]]>
  CDATA_SECTION_NODE: 4,
  // A ProcessingInstruction of an XML document, such as <?xml-stylesheet … ?>.
  PROCESSING_INSTRUCTION_NODE: 7,
  // A Comment node, such as <!-- … -->.
  COMMENT_NODE: 8,
  // A Document node.
  DOCUMENT_NODE: 9,
  // A DocumentType node, such as <!DOCTYPE html>.
  DOCUMENT_TYPE_NODE: 10,
  // A DocumentFragment node.
  DOCUMENT_FRAGMENT_NODE: 11,
});

/**
 * Traverse the DOM tree, and yield each node in the order they appear.
 * Parent nodes are yielded before their children.
 */
function* traverse(
  nodes: Node | Node[],
  ...filter: number[]
): Generator<Node, void, void> {
  if (!Array.isArray(nodes)) nodes = [nodes as Node];
  for (const node of nodes) {
    if (!filter || filter.includes(node.nodeType)) yield node;
    for (const child of (node.childNodes as any as Node[]) ?? []) {
      yield* traverse(child, ...filter);
    }
  }
}

/**
 * Traverse the DOM tree, and yield each node in the order they appear.
 * Parent nodes are yielded before their children.
 * @param {Node[]} nodes
 * @returns {}
 */
function* skippableTraverse(
  nodes: Node | Node[],
  ...filter: number[]
): Generator<[Node, (skip?: boolean) => any], void, void> {
  if (!Array.isArray(nodes)) nodes = [nodes as Node];
  for (const node of nodes) {
    let skip = false;
    yield [node, (s = true) => (skip = s)];
    if (skip) continue;
    for (const child of (node.childNodes as any as Node[]) ?? []) {
      yield* skippableTraverse(child, ...filter);
    }
  }
}

traverse.skippable = skippableTraverse;

export default traverse;
