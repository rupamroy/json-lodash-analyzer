(function(){
     angular.module('analyzerApp').config(Config);

     Config.$inject=['$routeProvider'];

     function Config($routeProvider){
         $routeProvider
             .when('/home',{
                 templateUrl:'js/home.html',
                 controller: 'homeController'
             })
             .otherwise('/home');

     }
})();