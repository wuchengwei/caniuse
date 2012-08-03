var fs = require('fs'),
    exec = require('child_process').exec,
    data = null;

function updateData(callback) {
    var cmd = 'curl https://raw.github.com/Fyrd/caniuse/master/data.json > ' + __dirname + '/data.json';
    exec(cmd, function(err, stderr, stdout) {
        if (err) {
            callback(err);
            return;
        }
        try {
            data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf-8'));
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
            data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf-8'));
        } catch (e) {
            throw 'read data error!';
        }
    }
    
    console.log(Object.keys(data.data));
    
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
        return data.data[keyword].stats[browser][maxVersion];
    }
    
    if (typeof browser === 'object' && browser.name && browser.version &&
        data.data[keyword] && data.data[keyword].stats[browser.name]) {
        return data.data[keyword].stats[browser.name][browser.version];
    }
    
    return null;
}


if (module && "exports" in module) {
	module.exports = {"query": query, "updateData": updateData};
}
