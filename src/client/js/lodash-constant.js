(function(){
    angular.module('analyzerApp')
        .constant('_', window._)
        .run(function($rootScope){
            $rootScope._ = window._;
        })
})();