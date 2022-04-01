# CollageJs

## About
Collagejs aims to provide frontend a way to interact with database, static .json file or through custom api that returns json. Collagejs makes it possible to create frontend just from a json data. 

## Features
* Event or Manual driven Lazyloading
* Server side templating
* Direct integration from Firebase, MongoDb, GrapHql, Mysql or any Database that can store json
* Frontend from Database (FFD)
* Super lightweight < kb gzipped

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
The first object of the array with no child may or may not have unique id which depend on your code logic refer to the ff.
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
