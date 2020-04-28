let s = 'abc1234efs123456sdsjsjs123456789';

let matched = s.match(/(\d+)/g);
s = Math.max(...matched);
console.log(s);

