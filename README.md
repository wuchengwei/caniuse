# node-caniuse

A node library to do compatibility validation for support of HTML5, CSS3, SVG and more in desktop and mobile browsers.
Based on [data from Fyrd's caniuse](https://github.com/Fyrd/caniuse).

### Installing
    npm install caniuse

### Usage

Check if CSS 3D transform is supported on android 2.3:

```js
var query = require('caniuse').query
    result;

result = query('transforms3d', {name:'android', version: '2.3'});

switch(result) {
case 'y':
    console.log('Supported.');
    break;
case 'y x':
    console.log('Supported, and vendor prefixed.');
    break;
case 'a':
    console.log('Partially supported.');
    break;
case 'a x':
    console.log('Partially supported, and vendor prefixed.');
    break;
case 'u':
    console.log('Unknown.');
    break;
default:
    console.log('NOT supported.');
}
```

Check if @font-face is supported on latest version of IE:

```js
var query = require('caniuse').query
    result;

result = query('fontface', 'ie');

if (result === 'y' || result === 'y x') {
    console.log('Fully Supported!');
}
```

### Related Projects
Fyrd's caniuse: https://github.com/Fyrd/caniuse
