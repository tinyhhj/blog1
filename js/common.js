var common = common || {undefined : undefined , empty : {}};

(function(common) {
    let idGen = 0;
    const pipe = (...fns)=>(init={})=>fns.reduce((acc,cur)=>cur(acc) , init);
    const assert = (condition , message='error occured' , cb)=> {
        if( !condition) {
            console.error(message);
            throw new Error(message);
        }
        if( cb && typeof cb === 'function') cb();
    };
    const storage = (function() {
        let data ={};
        let put = function(key, value) {
            assert(typeof key === 'string' && key.length > 0 , 'key should be string');
            const keyArr = key.split('.');
            const last = keyArr.pop();
            keyArr.reduce((acc,cur)=>{
                return acc[cur]  = acc[cur] ? acc[cur] : {}; 
            },data)[last] = value;    
        }

        let get = function(key) {
            assert(typeof key === 'string' && key.length > 0 , 'key should be string');
            const keyArr = key.split('.');
            return keyArr.reduce((acc ,cur)=> {
                return acc[cur] ? acc[cur] : common.empty;
            } , data);
        }
        return {
            put : put,
            get : get
        };
    })();

    const tagFactory = (tag)=>(props)=>{
        let obj = $('<'+tag+'>').attr({id : 'id-'+(++idGen)});
        if( props.className ) obj.addClass(props.className);
        if( props.attr ) obj.attr(props.attr);
        if( props.css ) obj.css(props.css);
        if( props.text ) obj.text(props.text);
        if( props.children ) obj.append(props.children);        
        if( props.callback ) obj.click(props.callback);
        if( props.value ) obj.val(props.value);
        return obj;
    }

    const prettyPrint = (fn)=>{
        let space = '';
        const tab = '    ';
        return fn.toString().split('\n')
        .map(v=>{
            if (/[{}].*[{}]/.test(v)) {
                return v.indexOf('{') > v.indexOf('}') ? 
            v.replace(/^\s*/g , space.slice(4)) :
            v.replace(/^\s*/g , space);
            }
            else if( /\{/.test(v) ) {
                const ns = v.replace(/^\s*/g , space)
                space += tab;
                return ns;
            }
            else if (/\}/.test(v)) {
                space = space.slice(4);
                return v.replace(/^\s*/g , space);
            }
            else {
                return v.replace(/^\s*/g , space);
            }
        }).join('\n');
        
        // .replace(/\{\s*|\s*\}\s*|\;\s*(?!\s*\})/g, function(match) {
        //     if( /\{/.test(match)) {
        //         space += tab;
        //         return '{\n' + space;
        //     } else if( /\;/.test(match)){
        //         return ';\n'+space
        //     }else {
        //         space = space.slice(4);
        //         return '\n'+space+'}\n'+space ;
        //     }
        // })
        // .replace(/\}\s*\)/g , '})')
        
    }
    
    
    common.pipe = pipe;
    common.assert = assert;
    common.storage = storage;
    common.tagFactory = tagFactory;
    common.prettyPrint = prettyPrint;
})(common);