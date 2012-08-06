var updateData = require('../lib/query').updateData;
updateData(function(err) {
    if (err) {
        console.log('\033[31m' + '****ERROR**** to update data!' + '\033[39m');
        console.log('\033[31m' + '****ERROR**** MSG: ' + err +  '\033[39m');
    } else {
        console.log('DONE!');
    }
});