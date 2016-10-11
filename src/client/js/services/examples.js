(function(){
    angular.module('analyzerApp')
        .factory('exampleFactory', ExampleFactory);


    function ExampleFactory(){
        return {
            getExamples: getExamples
        };

        function getExamples(){
            return [
                {
                    name: "Examples",
                    value: ""
                },
                {
                    name: "Map",
                    value: "_.map(jsonObj,function(o){\n\treturn { name: o.name };\n});"
                },
                {
                    name: "Find",
                    value: "_.find(jsonObj,function(o){\n\treturn o.username === 'Antonette';\n});"
                }
            ];
        }
    }

})();