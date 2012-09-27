# node-caniuse

A node library to do compatibility validation for support of HTML5, CSS3, SVG and more in desktop and mobile browsers.
Based on [data from Fyrd's caniuse](https://github.com/Fyrd/caniuse).

### Installing
    npm install caniuse

### Usage

Check if CSS 3D transform is supported on android 2.3:

```js
var query = require('caniuse').query,
    result;

result = query('transforms3d', {name:'android', version: '2.3'});

// query result:
// -2 : NOT supported
// -1 : NOT supported, but has polyfill available
//  0 : unknown
//  1 : partially supported, and vendor prefixed
//  2 : partially supported
//  3 : supported, and vendor prefixed
//  4 : supported

if (result > 2) {
    console.log('Fully supported!');
}
```

Check if @font-face is supported on latest version of IE:

```js
var query = require('caniuse').query,
    result;

result = query('fontface', 'ie');

if (result > 2) {
    console.log('Fully Supported!');
}
```

You may want to update the data from caniuse:
```sh
cd tool
node updateData.js
```

You can also update data in code:
```js
var updateData = require('caniuse').updateData;
updateData(function(err) {
    if (err) {
        throw err;
    }
    // do some query
});
```

### Related Projects
Fyrd's caniuse: https://github.com/Fyrd/caniuse
