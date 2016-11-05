(function () {
    angular.module('analyzerApp')
        .controller('homeController', HomeController);

    HomeController.$inject = ['$scope', 'exampleFactory', 'feedbackService'];

    function HomeController($scope, exampleFactory,feedbacksrv) {
        $scope.runExpression = runExpression;
        $scope.assignExpression = assignExpression;
        $scope.validateJson = validateJson;
        $scope.beautify = beautify;
        $scope.toggleFull = toggleFull;
        $scope.expressionDefault = '_.map(jsonObj,function(o){\n\treturn { name: o.name };\n});';
        $scope.jsonText = '[{"id":1,"name":"Leanne Graham","username":"Bret","email":"Sincere@april.biz","address":{"street":"Kulas Light","suite":"Apt. 556","city":"Gwenborough","zipcode":"92998-3874","geo":{"lat":"-37.3159","lng":"81.1496"}},"phone":"1-770-736-8031 x56442","website":"hildegard.org","company":{"name":"Romaguera-Crona","catchPhrase":"Multi-layered client-server neural-net","bs":"harness real-time e-markets"}},{"id":2,"name":"Ervin Howell","username":"Antonette","email":"Shanna@melissa.tv","address":{"street":"Victor Plains","suite":"Suite 879","city":"Wisokyburgh","zipcode":"90566-7771","geo":{"lat":"-43.9509","lng":"-34.4618"}},"phone":"010-692-6593 x09125","website":"anastasia.net","company":{"name":"Deckow-Crist","catchPhrase":"Proactive didactic contingency","bs":"synergize scalable supply-chains"}}]';
        $scope.outputObj = {};
        $scope.error = void 0;
        $scope.examples = exampleFactory.getExamples();

        function runExpression() {
            var jsonObj = {};
            if (validateJson()) {
                try {
                    jsonObj = JSON.parse($scope.jsonText);
                    $scope.outputObj = eval($scope.expression); // jshint ignore:line
                    $scope.previewString = JSON.stringify($scope.outputObj, null, "  ");
                    feedbacksrv.send('Rupam', 'roopamroy@gmail.com', 'Testing from home controller')
                        .then(function(data){
                            console.log(data);
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                }
                catch (err) {
                    $scope.error = err;
                }
            }
        }

        function assignExpression(){
            $scope.expression = angular.copy($scope.exampleSelected);
        }

        function beautify() {
            var jsonObj = {};
            if (validateJson()) {
                try {
                    jsonObj = JSON.parse($scope.jsonText);
                    $scope.outputObj = jsonObj;
                    $scope.previewString = JSON.stringify($scope.outputObj);
                }
                catch (err) {
                    $scope.error = err;
                }
            }
        }


        function validateJson() {
            if ($scope.jsonText) {
                try {
                    JSON.parse($scope.jsonText);
                    return true;
                }
                catch (err) {
                    return false;
                }
            }
            else {
                return false;
            }
        }

        function toggleFull(isFull) {
            if (isFull) {
                $scope.fullScreen = void 0;
            }
            else {
                $scope.fullScreen = true;
            }
        }

    }


})();