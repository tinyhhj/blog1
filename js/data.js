(function() {
    let label = {};
    let menu ={};
    let solution = {};

    label.algorithm = 'Algorithm';
    label.structure = 'Structure';
    label.language = 'Language';
    label.programmers = '프로그래머스';

    function makeTitle(title) {
        return  {
            text : title,
            className : 'list-group-item-action',
            attr : {
                'data-toggle' : 'collapse',
            }
        };
    }
    function makeContent( link = '#' , fns ,type ='codeContent') {
        return {
            type : type,
            link : link,
            className : 'collapse',
            children : fns
        };
    }
    
    menu.algorithm = {
        className : 'list-group-flush',
        children : [
            makeTitle('1. 완전탐색 - 모의고사'), 
            makeContent(
                'https://www.welcomekakao.com/learn/courses/30/lessons/42840?language=javascript'
                , [ function solution(answers) {
                var answer = [];
                var supo1 = [1,2,3,4,5];
                var supo2 = [2,1,2,3,2,4,2,5];
                var supo3 = [3,3,1,1,2,2,4,4,5,5];
                var ans1 = howManyCorrect(answers , supo1);
                var ans2 = howManyCorrect(answers , supo2);
                var ans3 = howManyCorrect(answers , supo3);
                var max = Math.max(ans1,ans2,ans3);
                if( max === ans1) answer.push(1);
                if( max === ans2) answer.push(2);
                if( max === ans3) answer.push(3);
                
                return answer;
            },
            function howManyCorrect(ans , supo) {
                return ans.filter(function(v, i){
                    return v === supo[i%supo.length];
                }).length
            }]
        ),
        makeTitle('2. 완전탐색 - 소수찾기'),
        makeContent('https://www.welcomekakao.com/learn/courses/30/lessons/42839?language=javascript',
            [
                function solution(numbers) {
                    var answer = 0;
                    var set = new Set();
                    makeNumbers(set , '' , numbers.split(''));
                    return set.size;
                },
                
                function issosu(num) {
                    if( num < 2) return false;
                    for (var i =2; i <= num / 2 ; i++) {
                        if( num % i === 0) return false;
                    }
                    return true;
                },
                
                function makeNumbers(set , cur, nums) {
                    if( nums.length === 0 ) return;
                    var clone = nums.slice().reverse();
                    nums.forEach(function(i) {
                        var su = clone.pop();
                        var num = Number(cur+su);
                        if ( issosu(num)) {
                            set.add(num);
                        }
                        
                        makeNumbers(set, cur+su , clone);
                        clone.unshift(su);
                    }) 
                }
            ]
        ),
    ]
    }
    common.storage.put('label' , label);
    common.storage.put('menu' , menu);
})();