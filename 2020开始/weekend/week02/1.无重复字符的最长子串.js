/* 
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb" 输出: 3 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:

输入: "bbbbb" 输出: 1 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
*/

var lengthOfLongestSubstring = function(s) {
    let set = new Set();
    let l = 0, r = -1, max = 0;

    while (l < s.length) {
        // 通过Set结构来判断是否有重复的字符
        if (!set.has(s[r+1]) && r + 1 < s.length) {
            r++;
            set.add(s[r]);
        } else {
            // 找到了重复字符就把最早出现的字符从Set里删除
            set.delete(s[l++]);
        }
        // r-l+1这个区间范围正好是不重复的最长子串位置，2-0+1，索引从0开始，求长度加个1
        max = Math.max(max, r - l + 1);
    }
    console.log(max);
    return max;
};
lengthOfLongestSubstring('bbabbb')