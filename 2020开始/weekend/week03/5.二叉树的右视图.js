/* 
输入: [1,2,3,null,5,null,4]
输出: [1, 3, 4]
解释:

   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---
*/
var rightSideView = function(root) {
    let res = [];
    if (!root) {
        return res;
    }
    let q = [];
    q.push(root);

    while (q.length) {
        for (let i = 0; i < q.length; i++) {
            let node = q.shift();
            if (i === q.length - 1) {
                res.push(node.val);
            }
            if (node.left) {
                q.push(node.left);
            }
            if (node.right) {
                q.push(node.right);
            }
        }
    }
    return res;
};