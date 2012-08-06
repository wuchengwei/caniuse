var query = require('../lib/query').query,
    features = ['css-grid', 'transforms2d'],
    browsers = [
        {'key': 'ie', 'name':'IE', 'version': '10'},
        {'key': 'firefox', 'name':'Firefox', 'version': '15'},
        {'key': 'chrome', 'name':'Chrome', 'version': '22'},
        {'key': 'safari', 'name':'Safari', 'version': '6'},
        {'key': 'opera', 'name':'Opera', 'version': '10.1'},
        {'key': 'ios_saf', 'name':'iOS Safari', 'version': '6'},
        {'key': 'op_mini', 'name':'Opera Mini', 'version': '6'},
        {'key': 'android', 'name':'Android Browser', 'version': '2.3'},
        {'key': 'op_mob', 'name':'Opera Mobile', 'version': '12'}];

features.forEach(function(feature) {
    browsers.forEach(function(browser) {
        console.log('---> Querying ' + feature + ' of browser ' + browser.name);
        console.log('---> Result: ' + query(feature, browser.key));
        console.log('---> Querying ' + feature + ' of browser ' + JSON.stringify({'name': browser.key, 'version': browser.version}));
        console.log('---> Result: ' + query(feature, {'name': browser.key, 'version': browser.version}));
    });
});