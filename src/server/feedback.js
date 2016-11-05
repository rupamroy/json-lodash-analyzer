/**
 * Created by rishabh on 11/4/16.
 */
"use strict";
var fs = require('fs');
var constants = require('./constants');
function storeFeedback(data) {
    try {
        var logStream = fs.createWriteStream(constants.feedbackfile, { 'flags': 'a' });
        logStream.write('name: ' + data.Name + '\n');
        logStream.write('feedback: ' + data.Feedback + '\n');
        logStream.end('----------------------------------' + '\n');
    }
    catch (error) {
        console.log(error);
    }
}
exports.storeFeedback = storeFeedback;
//# sourceMappingURL=feedback.js.map