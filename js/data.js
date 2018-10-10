(function() {
    let label = {};
    let menu ={};
    let solution = {};

    label.algorithm = 'Algorithm';
    label.structure = 'Structure';
    label.language = 'Language';
    label.programmers = '프로그래머스';
    label.css = 'CSS';

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
        css: {'flex-flow' : 'row wrap'},
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
        makeTitle('3. 완전탐색 - 숫자야구'),
        makeContent('https://www.welcomekakao.com/learn/courses/30/lessons/42841',
        [
            function solution(baseball) {
                var answer = 0;
                var arr = new Array(889).fill(0).map(function(v , i) {
                    return i + 111;
                })
                .filter(function(v){
                    var num = v;
                    var arr = new Array(10).fill(0);
                    while ( num > 0) {
                        ++arr[num % 10];
                        num =  Math.floor(num/10);
                    }
                    if( arr[0] > 0 || arr.filter(v=>v>1).length > 0) { return false;}
                    return true;
                });
                return baseball.reduce((acc,cur)=>{
                    var num = cur[0];
                    var predict = new Array(10);
                    predict[num%10] = 3;
                    num = Math.floor(num/10);
                    predict[num%10] = 2;
                    num = Math.floor(num/10);
                    predict[num%10] = 1;
                    return acc.filter(v=>{
                        var num = v;
                        var target = new Array(10);
                        var strike = 0 , ball = 0;
                        target[num%10] = 3;
                        num = Math.floor(num/10);
                        target[num%10] = 2;
                        num = Math.floor(num/10);
                        target[num%10] = 1;
                        target.forEach((v,i)=>{
                            if( predict[i] && v && v === predict[i]) strike++;
                            else if( predict[i] && v) ball++;
                        })
                        if( cur[1] === strike && cur[2] === ball) return true;
                        return false;
                    })
                } , arr).length;
            }
        ]),
        makeTitle('4. 완전탐색 - 카펫'),
        makeContent('https://www.welcomekakao.com/learn/courses/30/lessons/42842',[
            function solution(brown, red) {
                var answer = [];
                yaksu(red)
                .some(v=>{
                    var height = v[0] , width = v[1];
                    if( height * 2 + 2* width + 4 === brown) {
                        answer.push(width+2 , height+2);
                        return true;
                    }
                })
                return answer;
            },
            function yaksu(red) {
                var arr = [];
                arr.push([1,red]);
                for( var i = 2 , end = red-1 ; i <= end ; i++) {
                    if ( Math.floor(red / i ) === red / i) {
                        end = red / i -1;
                        arr.push([i , red/i]);
                    }
                }
                return arr;
            }
        ]),
        makeTitle('5. 이분탐색 - 예산'),
        makeContent('https://www.welcomekakao.com/learn/courses/30/lessons/43237',[
            function solution(budgets, M) {
                var answer = 0;
                var sum = sumf(budgets);
                
                if( sum <= M) {
                    return Math.max.apply(null,budgets);
                }
                else {
                    return s(budgets.sort((a,b)=>a>b?1:a<b?-1:0) ,M, 0 , budgets[budgets.length-1]);
                }
            },
            
            function sumf(arr) {
                return arr.reduce((acc,cur)=>acc+cur)
            },
            
            function s(arr ,M, min , max) {
                while( min <= max) {
                    var sanghan = Math.floor((min + max) / 2);
                    if ( M >= sumf(arr.map(v=>v>sanghan ? sanghan : v))) {
                        min = sanghan+1;
                    } else {
                        max = sanghan-1;
                    }
                }
                return max;
            }
        ]),
        makeTitle('6. 이분탐색 - 입국심사'),
        makeContent('https://www.welcomekakao.com/learn/courses/30/lessons/43238',[
            function floor(n){ return  Math.floor(n)},
            function solution(n, times) {
                var answer = 0;
                
                return s(n,times);
            },
            function s(n, times ) {
                var min =0 , max = n * Math.max.apply(null, times);
                while (min <= max) {
                    var mid = floor((min + max) / 2);
                    var maxInMid = times.reduce((acc,cur)=>acc += floor(mid/cur) , 0);
                    if( n <= maxInMid) {
                        max = mid -1;
                    } else {
                        min = mid + 1;
                    }
                }
                return min;
            }
        ]),
        makeTitle('7. 정렬 - k번째 수'),
        makeContent('https://www.welcomekakao.com/learn/courses/30/lessons/42748',[
            function solution(array, commands) {
                var answer = [];
                commands.forEach(v=>{
                    answer.push(array.slice(v[0]-1,v[1])
                    .sort((a,b)=>a>b? 1 : a<b? -1 : 0)[v[2]-1])
                })
                return answer;
            }
        ]),
        makeTitle('8. 정렬 - 가장 큰 수'),
        makeContent('https://www.welcomekakao.com/learn/courses/30/lessons/42746',[
            function solution(numbers) {
                var answer = '';
                var str= numbers.map(v=>String(v))
                .sort((a,b)=>{
                        if ( Number(a+b) < Number(b+a) ) return 1;
                        else if( Number(a+b) > Number(b+a)) return -1;
                        else {
                            return a.length < b.length ? 1 : -1;
                        }
                    }).join('');
                var idx = 0;
                while(str[idx] === '0') {
                    idx++;
                }
                if( idx === str.length) idx = str.length-1;
                return str.slice(idx);
            }
        ]),
        makeTitle('9. 정렬 - H-Index'),
        makeContent('https://www.welcomekakao.com/learn/courses/30/lessons/42747?language=javascript',[
            function solution(citations) {
                var answer = 0;
                return s(citations.sort((a,b)=>a<b? 1 : a>b? -1 : 0) , 0 , citations.length-1) 
                return answer;
            },
            function s(arr , st, ed) { 
                var h = 0;
                for( var i = st ; i <= ed ; i++) {
                    var cit = arr[i];
                    if( cit >= i+1 ) h= i+1;
                }
                return h;
            }
        ])

    ]
    }
    common.storage.put('label' , label);
    common.storage.put('menu' , menu);
})();