/* 
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
示例:
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
*/

let phoneMap = [
    ' ',    // 0
    '',     // 1
    'abc',  // 2
    'def',  // 3
    'ghi',  // 4
    'jkl',  // 5
    'mno',  // 6
    'pqrs', // 7
    'tuv',  // 8
    'wxyz'  // 9
];
var letterCombinations = function(digits) {
    let res = [];
    if (digits === '')
        return res;

    
    findCombination(digits, 0, '');

    return res;

    function findCombination(digits, index, str) {
        if (index === digits.length) {
            res.push(str);
            return;
        }
        let char = digits[index];
        let letters = phoneMap[char];
        for (let i = 0; i < letters.length; i++) {
            findCombination(digits, index + 1, str + letters[i]);
        }

    }
};