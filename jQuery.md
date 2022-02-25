# jQuery Notes
## Units
* em is simply the font size (might be different from place to place)
* px is not defined as a constant length, but as something that depends on the type of device and its typical use
* rem (for “root em”) is the font size of the root element of the document (constant throughout the document)
## SVG (Scalable Vector Graphics)
* SVG defines vector-based graphics in XML format
* Every element and every attribute in SVG files can be animated
## $ sign
* used to indicate that the following code is going to be jQuery
* Components
  * $(window)
  * $("#id")
  * $(".class")
  * $("div.something")
* Escape '$' sign
  * unicode: U+00024
  * hex code: &#x24;
  * html code: &#36;
  * html entity: &dollar;
  * css code: \00024
## Render: analying the tags and merging them with the text to produce a formatted display
## bind
* creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called
## this
* the value of this is determined by how a function is called (runtime binding)
* the object that is executing the current function
  * method in an object -> object
```
const vide = {
    title: 'a',
    play() {
        console.log(this); //representing the current object
    }
}
```
  * function (regular) -> global (window, global)
```
function Video(title) {
    console.log(this); //window object
    this.title = title;
    console.log(this); //Video object with title
}
```
  * combination
```
const video = {
    title: 'a',
    tags: ['a', 'b', 'c'],
    showTags1() {
        this.tags.forEach(function(tag) {
            console.log(this, tag); //will return "window a" -> this here refers to the window object
        });
    }
    showTags2() {
        this.tags.forEach(function(tag) {
            console.log(this, tag); //will return "{ object: "any object" } a"
        }, { object: "any object" });
    }
    showTags3() {
        this.tags.forEach(function(tag) {
            console.log(this, tag); //will return "video a"
        }, this); //here this refers to the current object (video)
    }
}
```
## toggleClass
* toggleClass() method toggles between adding and removing one or more class names from the selected elements
  * checks each element for the specified class names
  * the class names are added if missing, and removed if already set - This creates a toggle effect
  * however, by using the "switch" parameter, you can specify to only remove, or only add a class name
* $(selector).toggleClass(classname,function(index,currentclass),switch)
## offset()
* sets (of ALL matched elements) or returns (of the FIRST matched element with 2 properties -> the top and left positions in pixels) the offset coordinates for the selected elements, relative to the document
## stroke()
* draw the lines and border around the text and shapes
