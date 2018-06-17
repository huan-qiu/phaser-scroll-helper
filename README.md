## A helper function to imitate kinetic scrolling on Phaser's canvas



# Inspiration

ariya's [kinetic](https://github.com/ariya/kinetic/) and [littlee](https://github.com/littlee)'s scroll-related component



# Features

- Written in ES6

- Support **either** vertical kinetic scrolling **or** horizontal kinetic scrolling( Note: Not both direction at the same time)

  ​

# How to Used
1. download the 'src/phaserScrollCanvas.js' file to your project

2. import the file to get the default-exported function

3. Call the function to enable scrolling by passing in necessary parameters

   - if intent to scroll the whole canvas, simply pass your (1) game reference, and (2) the bounds where scrolling should be active to the function can do the magic for you. For Example, as follows:

   - ```javascript
     import getScrolling from '/your/paths/to/phaserScrollCanvas.js'

     // put the following in the State that you would like to do the scroll
     getScrolling({
       // scroll default to vertical direction, uncomment the next line if you want to scroll horizontally  
       // direction: 'horizontal', 
       game: window.game, // or your game reference
       newWorldBoundsInfoArr: [0, 0, 640, 2160], // [x, y, width, height] an array that reset the World bounds. In this case, it specifies the scrollable bounds. Usually the width and height are determined by the widest and highest object you want to display.
     })

     ```

   - if intent to narrow the scroll area down to a specific part on the canvas. More parameters should be passed. like this:

   - ```javascript
     import getScrolling from '/your/paths/to/phaserScrollCanvas.js'

     // put the following in the State that you would like to do the scroll
     getScrolling({
       // scroll default to vertical direction, uncomment the next line if you want to scroll horizontally  
       // direction: 'horizontal', 
       game: window.game, // or your game reference
       scrollAllBoo: false, // set to false to specify your don't want the whole canvas to scroll. Default to true.
       newWorldBoundsInfoArr: [0, 0, 640, 2160], // [x, y, width, height] an array that reset the World bounds. Make sure this new world bounds cover your target scrolling area.
       fixedToCameraObjsArr: [gameObjectReference [,gameObjectReference [,...]]], // an array whose items are the game objects that your want to stay put while scrolling. Default value is null, however, since you just want to enable scrolling on a specific part but the whole canvas, you should specify in the array which game object to stay still.
       scrollObj: ObjThatCanBeScrolled, // value of scrollObj is the game object that you intent to perform the scroll
       maskRectInfoArr: [180, 460, 380, 360] // [x, y, width, height] an array that specifies the view area of your scrollObj
     })
     ```



# License

MIT
