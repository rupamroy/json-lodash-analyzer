(function () {
    angular.module('analyzerApp')
        .controller('homeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController($scope) {
        $scope.runExpression = runExpression;
        $scope.validateJson = validateJson;
        $scope.beautify = beautify;
        $scope.expression = '_.keys(jsonObj)';
        $scope.outputObj = {};
        $scope.error = void 0;

        function runExpression() {
            var jsonObj = {};
            if (validateJson()) {
                try {
                    jsonObj = JSON.parse($scope.jsonText);
                    $scope.outputObj = eval($scope.expression);
                    $scope.previewString = JSON.stringify($scope.outputObj, null, "  ");
                }
                catch (err) {
                    $scope.error = err;
                }
            }
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
                    data = JSON.parse($scope.jsonText);
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

        function reset() {
            $scope.error = void 0;
        }

    }


})();