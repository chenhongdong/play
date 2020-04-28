/* 
给定一个二叉树，它的每个结点都存放着一个整数值。

找出路径和等于给定数值的路径总数。

路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。

示例：

root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

二叉树结构
       10
      /  \
     5    -3
    / \     \
   3   2    11
  / \   \
 3  -2   1
返回 3。和等于 8 的路径有:

5 -> 3
5 -> 2 -> 1
-3 -> 11
*/
var pathSum = function(root, sum) {
    if (!root) {
        return 0;
    }
    let res = findPath(root, sum);
    res += pathSum(root.left, sum);
    res += pathSum(root.right, sum);

    return res;


    function findPath(root, sum) {
        // 递归的终止条件
        if (!root) {
            return 0;
        }
        let num = 0;
        if (root.val === sum) {
            num++;
        }
        num += findPath(root.left, sum - root.val);
        num += findPath(root.right, sum - root.val);

        return num;
    }
};