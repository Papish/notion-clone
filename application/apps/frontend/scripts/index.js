const data = [
  {
    id: 1,
    name: "one",
    children: [
      {
        id: 2,
        name: "two",
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: "three",
    children: [
      {
        id: 4,
        name: "four",
        children: [],
      },
      {
        id: 5,
        name: "five",
        children: [],
      },
    ],
  },
];

// can be used to add children to nodes
// find the node and append children
function findNode(tree, id) {
  for (const node of tree) {
    if (node.id === id) {
      return node;
    }
    return findNode(node.children, id);
  }
  return null;
}

function addData(id) {
  const node = findNode(data, id);
  console.log("NODE: ", node);
}

addData(3);
// -----------

// console.log(JSON.stringify(data, null, 2));

/**
 * ---- Practice ----
 **/
// function reverse(n) {}
// console.log(reverse("hello"));
