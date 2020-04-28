/* 
删除链表中等于给定值 val 的所有节点。

示例:

输入: 1->2->6->3->4->5->6, val = 6

输出: 1->2->3->4->5
*/

var removeElements = function(head, val) {
    // 设置一个虚拟头节点，用来处理删除第一个节点的特殊情况
    let dummyHead = new ListNode(0);
    dummyHead.next = head;

    let cur = dummyHead;

    while (cur.next) {
        if (cur.next.val === val) {
            let delNode = cur.next;
            // 删除节点
            cur.next = delNode.next;
            // 释放待删除的节点
            delNode = null;
        } else {
            cur = cur.next;
        }
    }

    let res = dummyHead.next;
    // 释放dummyHead
    dummyHead = null;
    return res;
};