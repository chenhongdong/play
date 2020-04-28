/* 
翻转一棵二叉树。
示例：
输入：
二叉树结构
        4
      /   \
     2     7
    / \   / \
   1   3 6   9
输出：
二叉树结构
        4
      /   \
     7     2
    / \   / \
   9   6 3   1
*/
var invertTree = function(root) {
    if (!root) {
        return null;
    }
    // 反转其实就是交换左右子树
    let tmp = invertTree(root.left);
    root.left = invertTree(root.right);
    root.right = invertTree(tmp);

    return root;
};