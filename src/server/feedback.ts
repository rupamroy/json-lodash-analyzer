/**
 * Created by rishabh on 11/4/16.
 */

import fs = require('fs');
import constants = require('./constants')

export function storeFeedback(data: any): void {
    try{
        let logStream = fs.createWriteStream(constants.feedbackfile, {'flags': 'a'});
        logStream.write('name: ' + data.Name + '\n');
        logStream.write('feedback: ' + data.Feedback + '\n');
        logStream.end('----------------------------------' + '\n');
    }
    catch(error){
        console.log(error);
    }
}