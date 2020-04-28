/* 
给定一个二叉树，返回所有从根节点到叶子节点的路径。
说明: 叶子节点是指没有子节点的节点。
示例:
输入:
二叉树结构
  1
/   \
2    3
 \
  5
输出: ["1->2->5", "1->3"]
解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
*/
var binaryTreePaths = function(root) {
    let res = [];
    if (!root) {
        return res;
    }
    // 为叶子节点的情况
    if (!root.left && !root.right) {
        res.push(root.val + '');
        return res;
    }
    let left = binaryTreePaths(root.left);
    for (let i = 0; i < left.length; i++) {
        res.push(root.val + '->' + left[i]);
    }
    let right = binaryTreePaths(root.right);
    for (let i = 0; i < right.length; i++) {
        res.push(root.val + '->' + right[i]);
    }

    return res;
};