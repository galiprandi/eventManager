;(() => {
  eventManagerDebugMode = false

  // Prefix to event names
  const eventManagerPrefixed = "em"

  document.addEventListener("DOMContentLoad", initLibrary())

  function initLibrary() {
    if (eventManagerDebugMode) console.info("EventManager Starting...")
    const eventAvailableList = []
    for (key in document)
      if (key.substr(0, 2) === "on") eventAvailableList.push(key.slice(2))

    if (eventManagerDebugMode) {
      let msg = "Available event list:\n---------------------"
      // console.info("Available event list:", eventAvailableList)
      eventAvailableList.forEach(
        (item) =>
          (msg += `\n${eventManagerPrefixed}${item
            .substr(0, 1)
            .toUpperCase()}${item.substr(1)}`)
      )
      console.info(msg)
    }

    eventAvailableList.forEach((event) =>
      document.addEventListener(event, eventManager)
    )
  }

  function eventManager() {
    const actions = eventMapper(event)
    if (actions) executeActions(actions)
  }

  function executeActions(actions) {
    actionsArr = actions.split("|")
    actions.split("|").forEach((fn) => {
      if (eventManagerDebugMode) console.log(`Call function ${fn}()`)
      if (existFunction(fn)) window[fn]()
    })
  }

  function existFunction(name) {
    return typeof window[name] === "function"
  }

  function eventMapper(event) {
    const { type, target } = event
    const eventHandleProp = `${eventManagerPrefixed}${type}`
    const hasProp = !!target?.attributes?.hasOwnProperty(eventHandleProp)
    if (!hasProp) return
    return target.attributes[eventHandleProp].value
  }

  setEventManagerDebugMode = (value = false) => {
    eventManagerDebugMode = value
    if (eventManagerDebugMode) console.log("eventManager debug mode: ON")
    else console.log("eventManager debug mode: OFF")
  }
})()
