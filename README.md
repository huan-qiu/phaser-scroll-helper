## A helper function to imitate kinetic scrolling on Phaser's canvas



# Inspiration

Many thanks to ariya's [kinetic](https://github.com/ariya/kinetic/) tutorial and [littlee](https://github.com/littlee)'s scroll-related component



# Features

- Written in ES6

- Support **either** vertical kinetic scrolling **or** horizontal kinetic scrolling( Note: Not both directions at the same time)

  ​

# Demo

Scroll the whole canvas horizontally:  [here](https://codepen.io/huan555/full/BVmZbQ/)

Scroll part of canvas vertically:  [here](https://codepen.io/huan555/full/LrOjNP/)



# How to Use

1. download the 'src/phaserScrollCanvas.js' file to your project

2. import the file to get the default-exported function

3. Call the function to enable scrolling by passing in necessary parameters

   - if intent to scroll the whole canvas, simply pass your (1) game reference, and (2) the bounds where scrolling should be active to the function can do the magic for you. For Example, as follows:

   - ```javascript
     import getScrolling from '/your/paths/to/phaserScrollCanvas.js'

     // put the following in the State that you would like to do the scroll
     getScrolling({
       // scroll defaults to vertical direction, uncomment the next line if you want to scroll horizontally  
       // direction: 'horizontal', 
       game: window.game, // or your game reference
       newWorldBounds: [0, 0, 640, 2160], // Array, [x, y, width, height], to resets the World bounds. In this case, it specifies the scrollable bounds. Usually the width and height are determined by the widest and highest object you want to display.
     })

     ```

   - if intent to narrow the scroll area down to a specific part on the canvas. More parameters should be passed. like this:

   - ```javascript
     import getScrolling from '/your/paths/to/phaserScrollCanvas.js'

     // put the following in the State that you would like to do the scroll
     getScrolling({
       // scroll defaults to vertical direction, uncomment the next line if you want to scroll horizontally  
       // direction: 'horizontal', 
       game: window.game, // or your game reference
       scrollAll: false, // Boolean, set to false to specify your don't want the whole canvas to scroll. Default to true.
       newWorldBounds: [0, 0, 640, 2160], // Array, [x, y, width, height], to reset the World bounds. Make sure this new world bounds cover your target scrolling area.
       fixedToCameraObjs: [gameObjectReference [,gameObjectReference [,...]]], // an array whose items are the game objects that your want them to stay put while scrolling. Default value is null.
       scrollObj: ObjThatCanBeScrolled, // value of scrollObj is the game object's reference that you intent to perform the scroll
       maskRect: [180, 460, 380, 360] // Array, [x, y, width, height], to specify the view area of your scrollObj
     })
     ```



# License

MIT
