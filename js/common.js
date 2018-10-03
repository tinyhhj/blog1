var common = common || {undefined : undefined , empty : {}};

(function(common) {
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
    
    
    common.pipe = pipe;
    common.assert = assert;
    common.storage = storage;
})(common);