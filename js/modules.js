var common = common || {undefined : undefined , empty : {}};

(function(modules) {
    const listGroup = function(props) {
        if( props.children && typeof props.children === 'object' ) {
            if( !Array.isArray(props.children)) {
                const arr = [];
                arr.push(props.children);
                props.children = arr;     
            }
            props.children = props.children.map(prop=> listGroup.listItem(prop));
        }
        return listGroup.listFactory(props).addClass('list-group');
    }
    listGroup.itemFactory = common.tagFactory('a');
    listGroup.listFactory = common.tagFactory('div');
    listGroup.listItem = function(props) {
        let obj;
        if( props instanceof $ ) {
            obj = props;
        } 
        else if( props.type === 'codeContent') {
            return common.tagFactory('div')(
                Object.assign(props , 
                {children : [
                    common.tagFactory('a')({attr : {href : props.link , target : '_blank'} , text : ' - 문제보기 -'}),
                    codeBlock({children : props.children})
                ]})
            )
        }
        else {
            obj = listGroup.itemFactory(props);
        }
        return obj.addClass('list-group-item');
    }
    modules.listGroup = listGroup;


    const codeBlock = function(props) {
        let arr = [];
        if( props.children && !Array.isArray(props.children)) {
            arr.push(props.children);
            props.children = arr;
        }
        let code = common.tagFactory('code')({text : props.children.filter(fn=> fn instanceof Function).map(fn => common.prettyPrint(fn)).join('\n')})
        return common.tagFactory('pre')(Object.assign({}, props , {children : code}));
    }
    modules.codeBlock = codeBlock;

    const codeLink = function(props) {
        return common.tagFactory('a')(props); 
    }
    modules.codeLink = codeLink;

    const codeContent = function(props) {
        return common.tagFactory('div')({children : [props.link , props.body]})
    }
    modules.codeContent = codeContent;

})(common.modules = common.modules || {});


