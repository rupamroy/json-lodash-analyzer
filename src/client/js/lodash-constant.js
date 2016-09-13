(function(){
    angular.module('analyzerApp')
        .constant('_', window._)
        .run(Run);

        Run.$inject=['$rootScope'];

        function Run($rootScope){
            $rootScope._ = window._;
        }
})();