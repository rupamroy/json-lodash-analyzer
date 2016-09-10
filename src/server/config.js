(function() {
    var path, rootPath, bowerPath;

    path = require('path');

    rootPath = path.normalize(__dirname + '/../client');
    bowerPath = path.normalize(__dirname + '/../../');
    module.exports = {
        rootPath: rootPath,
        bowerPath: bowerPath
    };

}).call(this);