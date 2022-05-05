# CollageJs
Json to web frontend builder

## About
Collagejs builds web frontend from defined array of json object. The json object can be sourced from static .json file, (mongodb, firebase)database, or api returning json. Collagejs also enables you to serve elements of the html from serveral different servers, it could be from cdn or api's with json response. Collagejs was created to support my development on embedded web panel for microcontrollers since theres no ORM to support building html using c++, a regular c++ json library will bridge this as ORM for building web panels for embedded devices.

## Use Cases
* Reupdating user interface based on server api response (SSR)
* Presenting frontend straight from database like mongo or firebase
* Dynamic injection and execution of javascript functions 
* Html elements can be served on multiple hosting or servers
* You can reupdate specific element based on user interaction like click or input changes
* Template engine alternative and crossplatform because its just json object
* Lazy loading can be implemented per collagejs element
* Collagejs elements can be rendered one by one respectively
* Ondemand rendering of collage element like when user scroll or change tab

## Usage
You can check example folder for browser or node usage
```html
<link rel="stylesheet" href="./bootstrap.min.css" />
<body>
  <div id="element"></div>
  <div id="element2"></div>  
  <script src="./collagejs.js"></script>
  <script>
    const Collage = collagejs;
    var json = [
        {
          e: {
            t: "div",
            a: {
              class: ["container", "m-4", "p-4", "text-danger"],
              style: ["background-color:yellow;"],
            },
            b: "No need to add id attribute when no child element",
          },
        },    
    ];
    let el = new Collage("element", json);
    let el2 = new Collage("element2", json); // json can be result of axios or mongodb request
    el.paint;
    el2.paint;
  </script>
</body>
```


## Basic Json Structure of Element
basic collagejs element structure, you can add more element object on the array
```javascript
[
    {
      e: {
        t: "div",
        a: {class:["container","mb-2"],style:"background-color:red"},
        b: "this is body text or can be just another element object" 
      }
    },
]
```
which will be converted to
```html
<div class="container mb-2" style="background-color:red">
  this is body text or can be just another element object
</div>
```
## Object definition
Please follow order of each json keys.
```
  e - element - object which value composed of keys t, p, a, and b,
  t - tag - where value is any valid html tag ie div,span,ul,script etc
  p - parent - element_id where this element will apear as child element
  a - attribute - where value is object with any valid html attribute as key, - must be rewritten as _ ie. data-xxx to data_xxx
      any attribute requiring multiple values can be array or single string like class: ["container","mb-2"] or class: "container mb-2"
  b - body - where value can be string or element object and can be infinitely nested with another element object
```
## Nesting
Element nesting are possible inside b key or the body or the element object.
For deeply nested elements please use p key for specifying the parent element where it should be created, refer to json_2.
```javascript
let json_1 = [
        {
          e: {
            t: "div",
            a: {
              class: "container",
              id: "div1"
            },
            b: {
              e: {
                t: "div",
                a: {
                  class: "m-2 p-2",
                },
                b: "This is the final nested child element",
              },
            }
          },
        },
]

let json_2 = [
        {
          e: {
            t: "div",
            a: {
              class: "container",
              id: "div1"
            },
            b: [
              {
                e: {
                  t: "div",
                  p: "div1",
                  a: {
                    class: "m-1 p-1",
                    id: "div2"
                  },
                  b: [
                    {
                      e: {
                        t: "div",
                        p: "div2"
                        a:{},
                        b:"deeply nested element"
                      }
                    }
                  ],
                },
              },
              {
                e: {
                  t: "div",
                  p: "div1",
                  a: {
                    class: "m-2 p-2",
                  },
                  b: "This is the another element",
                },
              },              
            ]
          },
        },
]
```

## Functions
You can also create script element with functions in string as b value. It will be executed when dom finish building the element.
```javascript
[
     {
       e: {
         t: "script",
         a: {
           type: "text/javascript",
         },
         b: "alert('This is script element with alert function in body');",
       },
     },
]
```

## Notes
Final child element on deeply nested element may or may not have any unique id attribute, parent elements must have unique id when body nested with another element object. Check the ff.
The json object array members are parent elements which may or may not have id when it doesnt have any child elements.
When to use p key? simply check nest if its 3 or beyond nested element then use p key, example below does not need p key since theres only 2 nested elements.
You can still use p key on 2 nested elements but its optional.
```javascript
      let json2 = [
        {
          e: {
            t: "div",
            a: {
              class: ["container", "m-2"],
              id: "div1",
            },
            b: {
              e: {
                t: "div",
                a: {
                  class: ["container", "m-4", "p-4", "text-danger"],
                  style: ["background-color:yellow;"],
                  id: "div2",
                },
                b: "FInal child element may or may not contain id attribute, 
                    you might need to use the id later if you want to edit this element using dom",
              },
            },
          },
        },
        {
          e: {
            t: "div",
            a: {
              class: ["container", "m-4", "p-4", "text-danger"],
              style: ["background-color:yellow;"],
            },
            b: "No need to add id on this parent element",
          },
        },
      ];
```
## Methods and Getters
* paint - getter, will build the element on the html document
* rePaint(new_json) - method, will replace the element with new json object

## Todo
* options for element placement before after
* options for element binding instead of just id like classname etc
* option for adding element dynamically like link or script on document head
* more use case and examples
* html to collagejs json object converter

## License
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
