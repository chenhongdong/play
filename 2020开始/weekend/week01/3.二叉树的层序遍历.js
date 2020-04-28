/* 
给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。
例如:
给定二叉树: [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：
[
  [3],
  [9,20],
  [15,7]
]
*/

var levelOrder = function(root) {
    let res = [];
    if (!root) {
        return res;
    }
    // 队列
    let q = [];
    q.push(new Pair(root, 0));

    while (q.length) {
        let {node, level} = q.shift();
        if (level === res.length) {
            res.push([]);
        }
        res[level].push(node.val);
        if (node.left) {
            q.push(new Pair(node.left, level + 1));
        }
        if (node.right) {
            q.push(new Pair(node.right, level + 1));
        }
    }
    return res;
};

function Pair(node, level) {
    this.node = node;
    this.level = level;
}