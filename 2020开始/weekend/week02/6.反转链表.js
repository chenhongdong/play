/* 
反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL

输出: 5->4->3->2->1->NULL
*/

var reverseList = function(head) {
    let cur = head;
    let pre = null;

    while (cur.next) {
        let next = cur.next;
        // 反转链表
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    return pre;
};