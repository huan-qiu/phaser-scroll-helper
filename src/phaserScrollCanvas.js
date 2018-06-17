export default ({game, scrollAll = true, newWorldBounds, direction = 'vertical', fixedToCameraObjs = null, maskRect = [], scrollObj = null}) => {
  let pressed, lastY, lastTrackY, vUsed, amplitude, timestamp, ticker, delta

  // set a specific area to be scrolled
  game.world.setBounds(...newWorldBounds)

  // to scroll the whole world OR just a specific part inside the world
  if (!scrollAll && fixedToCameraObjs) {
    for (let item of fixedToCameraObjs) {
      item.fixedToCamera = true
    }
    scrollObj.mask = game.add.graphics()
    scrollObj.mask.drawRect(...maskRect)
    scrollObj.mask.fixedToCamera = true

    scrollObj.inputEnabled = true
    scrollObj.events.onInputDown.add(touchScreen)
    scrollObj.events.onInputUp.add(releasePointer)
  } else {
    game.input.onDown.add(touchScreen)
    game.input.onUp.add(releasePointer)
  }

  game.input.addMoveCallback(dragOnScreen)

  function touchScreen (pointerGame, pointerObj) {
    let pointer = scrollObj ? pointerObj : pointerGame
    pressed = true
    lastY = lastTrackY = direction === 'vertical' ? pointer.y : pointer.x
    vUsed = amplitude = 0
    timestamp = Date.now()
    ticker = setInterval(trackVelocity, 100)
    return false
  }

  function trackVelocity () {
    // trace and update vUsed every 100ms
    if (!pressed) return false
    let now, elapsed, vReal, deltaT, nowTrackY
    now = Date.now()
    elapsed = now - timestamp
    nowTrackY = direction === 'vertical' ? game.input.y : game.input.x
    deltaT = nowTrackY - lastTrackY
    lastTrackY = nowTrackY
    timestamp = now

    vReal = 1000 * deltaT / (1 + elapsed)
    vUsed = 0.8 * vReal + 0.2 * vUsed
  }

  function dragOnScreen (pointer) {
    if (pressed) {
      let nowY = direction === 'vertical' ? pointer.y : pointer.x
      delta = lastY - nowY

      if (delta > 2 || delta < -2) {
        lastY = nowY

        getScrolling(delta)
      }
    }
    return false
  }

  function getScrolling (delta) {
    if (direction === 'vertical') {
      game.camera.y += delta
    } else {
      game.camera.x += delta
    }
  }

  function releasePointer () {
    pressed = false
    clearInterval(ticker)
    if (vUsed > 10 || vUsed < -10) {
      // factor 0.1 is tweakable, fancy a 'heavy-scrolling-feel', reduce the value of factor.
      amplitude = Math.round(0.1 * vUsed)
      timestamp = Date.now()
      // requestAnimationFrame only schedules a single update to the script-based animation. If subsequent animation frames are needed, then requestAnimationFrame will need to be called again from within the callback.
      requestAnimationFrame(getAutoSlide)
    }
    return false
  }

  function getAutoSlide () {
    let timeConstant = 325
    let elapsed
    if (amplitude) {
      elapsed = Date.now() - timestamp
      delta = -amplitude * Math.exp(-elapsed / timeConstant)
      if (delta > 0.5 || delta < -0.5) {
        getScrolling(delta)
        requestAnimationFrame(getAutoSlide)
      } else {
        getScrolling(delta)
      }
    }
  }
}
