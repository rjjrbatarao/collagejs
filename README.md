# CollageJs
Json to html builder

## About
Collagejs builds web frontend from predefined array of json object. The json object can be sourced from static .json file, database, or api returning json. 

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
            b: "No need to add id on",
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


## basic structure
element structure
```
[{
  e: {
    t: "div"
    a: {class=["container","mb-2"],style="background-color:red"},
    b: "this is body text or can be just another element object" 
  }
}]
```
```
  e - element 
  t - tag where value is any valid html tag ie div,span,ul,script etc
  a - attribute where value is object with any valid html attribute as key, - must be rewritten as _ ie. data-xxx to data_xxx
      any attribute requiring multiple values can be array or single string like class: ["container","mb-2"] or class: "container mb-2"
  b - body where value can be string or element object
```
## Functions
You can also create script with functions as element. It will be executed when dom finish building the element
```
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
## Todo
* options for element placement before after
* options for element binding instead of just id like classname etc
* option for adding element dynamically like link or script on document head
* more use case and examples

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
