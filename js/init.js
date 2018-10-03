$(function() {
    $('.sdh-text').each(function(idx , element) {
        let result = common.storage.get($(element).data('message-key'));
        if ( result !== common.empty ) {
            let children = $(element).children();
            $(element).text(result).append(children);
        }
    })
});

(function initMessage() {
    let label = {};
    
    label.algorithm = 'Algorithm';
    label.structure = 'Structure';
    label.language = 'Language';
    label.fullSearch = '완전탐색';
    
    common.storage.put('label' , label);
})();
