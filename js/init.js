$(function() {
    $('.sdh-text').each(function(idx , element) {
        let result = common.storage.get($(element).data('message-key'));
        if ( result !== common.empty ) {
            let children = $(element).children();
            $(element).text(result).append(children);
        }
    });
    let order = 1;
    const algorithmList = $('#algorithm-list-group').append(common.modules.listGroup(common.storage.get('menu.algorithm')));
    algorithmList
    .children('.list-group')
    .children('a')
    .each((idx,cur)=> $(cur).attr({'data-target' : '#'+$(cur).next().attr('id')}))
    
});
