# collagejs

Json to html builder

# basic structure

element structure

{
element0 : [{
attributes classes id etc .....
},
{
element1 : [{
attributes .....
},{
element2 ....
}]
},
{
element3 ......
}]
}

element value is array, at 0 are always reserved for attributes, 1 2 3... are nested elements or elements contained within the element
elements are div span p a or any valid html tags
