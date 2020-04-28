/* 
给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
示例:
    输入: [1,2,3,null,5,null,4]
    输出: [1, 3, 4]
解释:
   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---
*/


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var rightSideView = function(root) {
    // 创建一个结果数组用来保存右节点的值
    let res = [];
    // 如果节点为null就返回空数组
    if (root === null) {
        return res;
    }
    // 创建一个队列,并放入根节点
    let q = [];
    q.push(root);

    // 循环队列，依次取出队首的节点
    while (q.length) {
        for (let i = 0; i < q.length; i++) {
            // 取出队首节点
            let node = q.shift();
            // 如果索引等于队列的长度减1就表示，当前的节点是在树的最右侧
            if (i === q.length - 1) {
                res.push(node.val);
            }
            // 如果还有左节点就继续放到队列中
            if (node.left) {
                q.push(node.left);
            }
            // 如果有右节点也继续放到队列
            if (node.right) {
                q.push(node.right);
            }
        }
    }
    // 返回结果数组
    return res;
};