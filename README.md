# CollageJs

## About
Collagejs aims to provide frontend a way to interact with database, static .json file or through custom api that returns json. Collagejs makes it possible to create frontend just from array of json object. 

## Features
* Event or Manual driven Lazyloading
* Server side templating
* Direct integration from Firebase, MongoDb, GrapHql, Mysql or any Database that can store json
* Frontend from Database (FFD)
* Super lightweight < 1kb gzipped

## Usage html
```html
<script src="./collagejs.js"></script>
<body>
<div id="element"></div>
<div id="element2"></div>
<script>
  const Collage = collagejs;
  var json = {
    e: {
            t: "div",
            a: {
              class: ["container", "m-4", "p-4", "text-danger"],
              style: ["background-color:yellow;"],
            },
            b: "No need to add id on",      
    }
  }
  let el = new Collage("element", json);
  let el2 = new Collage("element2", json); // this could be another json from static file or reponse from axios
  el.paint;
  el2.paint;
</script>
</body>
```
## Usage node
```javascript
const Collage = require("./collagejs.js");
```

## Collagejs JSON format for frontend
```
[
  e:{
    t: "div",
    a: {
      class: ["container", "m-2"],
      id: "div1"
    },
    b: "THis is collagejs element"
  }
]
```
Will be equivalent to
```html
  <div class="container m-2" id="div1">
    THis is collagejs element
  </div>
```
Collagejs uses json object with e,t,a,b as keys and will be treated as single element, this can be infinitely nested to form complex html elements.
```
e - element which value is an object containing t, a, & b
t - tag which value is any valid html tag ie. div, span, li etc
a - attribute where value is an onject containing any valid html attribute names as key, data-xxx must be rewritten as data_xxx object key 
b - body where value can be string or another collage element e object 
```
## Key e example
```
[{
  e: {t:"",a:{},b:""}
}]
```
## Key t example
```
[{
  e: {t:"div",a:{},b:""}
}]
```
## Key a example
```
[{
  e: {t:"div",a:{class:["container","text-primary"],style="background-color:red",hidden:"hidden"},b:""}
}]
```
## Key b example
string body
```
[{
  e: {t:"div",a:{class:["container","text-primary"],style="background-color:red",hidden:"hidden"},b:"This is the body of the element"}
}]
```
or another element
```
[{
  e: {t:"div",a:{class:["container","text-primary"],style="background-color:red",hidden:"hidden",id="div1"},b:{e: {t:"div",a:{class:["container","text-primary"],style="background-color:red",hidden:"hidden"},b:"This is the body of the 2nd element"}}}
}]
```
Any parent element within nested element must have unique id as attribute like the above example which has id="div1", the final child element may or may not have unique id.
The first object of the array with no child may or may not have unique id refer to the ff.
```
[
{
  e: {t:"div",a:{class:["container","text-primary"],style="background-color:red",hidden:"hidden",id="div1"},b:{e: {t:"div",a:{class:["container","text-primary"],style="background-color:red",hidden:"hidden"},b:"This is the body of the 2nd element"}}}
},
{
  e: {t:"div",a:{class="container"},b:"No id attribute because it doesnt have child element"}
}
]
```
Element can be javascript as well ie., functions as string will be executed inside the body.
```
        {
          e: {
            t: "script",
            a: {
              type: "text/javascript",
            },
            b: "alert('This is script element with alert function in body');",
          },
        }
```

## Todo
* element placement before or after
* element placement on head for dynamic .css and .js
* add more element binding option aside from id, like class name etc
* examples and usecases

## License
```
The MIT License (MIT)

Copyright (c) <year> Adam Veldhousen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
