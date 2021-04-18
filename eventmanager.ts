/**
 * This library it'll execute when document is loaded, and his listen all
 * events that occur in object windows.
 *
 * When event is dispatched from element with the attribute emClick,
 * or any other events with "em" prefix, this library search and execute
 * all functions in this attribute value.
 *
 * You can call more of one function, separating them with space.
 *
 * Example of button that call two function en double click:
 *
 * <button emdblclick="FnOne FnTwo">Make Double Click</button>
 *
 * Disclaimer: FnOne and FnTwo need to be defined in document !
 *
 */

(() => {
    /**
     * Define a prefix to use in events names.
     * Example: enClick
     */
    const eventManagerPrefixed = 'em'

    /**
     * Define if it in debug mode.
     *
     * By default, debug mode it true, if your application running on
     * port different of 80, http://localhost:3000 for example.
     */
    const eventManagerDebugMode = !!location.port

    // Initializing library when document is loaded
    document.addEventListener('DOMContentLoaded', initEventManager)

    function initEventManager() {
        if (eventManagerDebugMode) console.info(`evenManager is listen events with prefix "${eventManagerPrefixed}"`)

        /**
         * Get all events available to listen on window object.
         *
         * You can define your personalized event list, defining an array
         * availableEvents constants and comment next lines.
         */
        const availableEvents = Object.keys(window)
            .filter(key => key.startsWith('on'))
            .map(key => key.slice(2))

        if (eventManagerDebugMode)
            console.info(
                `Listening to the following events with prefix "${eventManagerPrefixed}":\n`,
                availableEvents.join(', ')
            )

        // Attach listeners to object windows
        availableEvents.forEach(event => window.addEventListener(event, eventManager))

        // Manage event on elements
        function eventManager(event: Event) {
            const actions = eventMapper(event)
            if (eventManagerDebugMode && actions) console.info(actions)
            if (actions) executeActions(actions)
        }

        // Execute functions on actions
        function executeActions(actions: string) {
            const arrayOfActions = actions.trim().split(' ') || []
            arrayOfActions.forEach(fn => {
                if (eventManagerDebugMode) console.log(`Calling function ${fn}()`)
                //@ts-ignore
                if (existFunction(fn)) window[fn]()
            })
        }

        // Return a string with list of functions to execute, or null
        function eventMapper(event: Event) {
            const element = event.target as HTMLElement
            const type = event.type

            if (!element || !element.attributes) return null

            const eventName = eventManagerPrefixed + type
            // Get event triggers
            const eventTrigger = element.attributes.getNamedItem(eventName)

            if (eventTrigger && eventTrigger.value) return eventTrigger.value

            return null
        }

        // Check if function name exist in windows object
        function existFunction(name: string) {
            return typeof window[<any>name] === 'function'
        }
    }
})()
