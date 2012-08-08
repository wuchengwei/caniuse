var fs = require('fs'),
    exec = require('child_process').exec,
    data = null;

var statusMap = {    
    'n': -2, // NOT supported
    'p': -1, // NOT supported, but has polyfill available
    'u': 0, // unknown
    'a x': 1, // partially supported, and vendor prefixed
    'a': 2, // partially supported
    'y x': 3, // supported, and vendor prefixed
    'y': 4 // supported
};

function updateData(callback) {
    var cmd = 'curl https://raw.github.com/Fyrd/caniuse/master/data.json > ' + __dirname + '/../data/data.json';
    exec(cmd, function(err, stderr, stdout) {
        if (err) {
            callback(err);
            return;
        }
        try {
            data = JSON.parse(fs.readFileSync(__dirname + '/../data/data.json', 'utf-8'));
            callback(null);
        } catch (e) {
            data = null;
            callback(e);
        }
    });
}

function query(keyword, browser) {
    if (!data) {
        try {
            data = JSON.parse(fs.readFileSync(__dirname + '/../data/data.json', 'utf-8'));
        } catch (e) {
            throw 'read data error!';
        }
    }
    
    if (typeof browser === 'string' &&
        data.data[keyword] && data.data[keyword].stats[browser]) {
        var maxVersion = '0.0';
        Object.keys(data.data[keyword].stats[browser]).forEach(function(version) {
            var originalVersion = version;
            if (version.indexOf('-') != -1) {
                version = version.split('-').pop();
            }
            if (parseFloat(version) > parseFloat(maxVersion)) {
                maxVersion = originalVersion;
            }
        });
        return statusMap[data.data[keyword].stats[browser][maxVersion]];
    }
    
    if (typeof browser === 'object' && browser.name && browser.version &&
        data.data[keyword] && data.data[keyword].stats[browser.name]) {
        var theVersion = browser.version,
            versions, versionArray;
        versions = Object.keys(data.data[keyword].stats[browser.name]);
        for(var i = 0, length = versions.length; i < length; i++) {
            if (parseFloat(versions[i]) == parseFloat(theVersion)) {
                theVersion = versions[i];
                break;
            }
            if (versions[i].indexOf('-') != -1) {
                versionArray = versions[i].split('-');
                if ((parseFloat(versionArray[0]) <= parseFloat(theVersion)) &&
                    (parseFloat(versionArray[1]) >= parseFloat(theVersion))) {
                    theVersion = versions[i];
                    break;
                }
            }
        }
        return statusMap[data.data[keyword].stats[browser.name][theVersion]];
    }
    
    return null;
}


if (module && "exports" in module) {
    module.exports = {"query": query, "updateData": updateData};
}
