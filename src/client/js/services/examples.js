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
                    name: "Examples of Expressions",
                    value: ""
                },
                {
                    name: "Map",
                    value: "_.map(jsonObj,function(o){\n\treturn { name: o.name };\n});"
                },
                {
                    name: "Find",
                    value: "_.find(jsonObj,function(o){\n\treturn o.username === 'Antonette';\n});"
                },
                {
                    name: "Filter",
                    value: "_.filter(jsonObj,function(o){\n\treturn o.username === 'Antonette';\n});"
                },
                {
                    name: "Code",
                    value: "var x=_.map(jsonObj,function(o){\n\treturn { name: o.address };\n})\n_.filter(x,function(o){\n\treturn o.city === 'Wisokyburgh';\n});"
                }
            ];
        }
    }

})();