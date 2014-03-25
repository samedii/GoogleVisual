googleVisual.tools = (function(tools) {

    //private

    //public

    tools.createQuery = function createQuery(queryList) {

        if (typeof index !== 'undefined') {
            return queryList[index];
        } else {
            return queryList.join('+');
        }
    };

    return tools;

})(googleVisual.tools || {});
