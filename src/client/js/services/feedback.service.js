(function(){
    angular.module('analyzerApp')
        .service('feedbackService',FeedbackService);

    FeedbackService.$inject = ['$http'];
    function FeedbackService($http){
        this.send = send;
        var feedbackUrl = '/api/v1/feedback';
        function send(name,email,message){
            var messageBody = {
                Name : name,
                Feedback : message,
                Email: email
            };

            return $http.post(feedbackUrl, messageBody)
                .then(function(){
                    return "Feedback successfully posted";
                })
                .catch(function(err){
                    throw err;
                });
        }
    }
})();