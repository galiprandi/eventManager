"use strict";
(() => {
    const eventManagerPrefixed = 'em';
    const eventManagerDebugMode = !!location.port;
    document.addEventListener('DOMContentLoaded', initEventManager);
    function initEventManager() {
        if (eventManagerDebugMode)
            console.info(`evenManager is listen events with prefix "${eventManagerPrefixed}"`);
        const availableEvents = Object.keys(window)
            .filter(key => key.startsWith('on'))
            .map(key => key.slice(2));
        if (eventManagerDebugMode)
            console.info(`Listening to the following events with prefix "${eventManagerPrefixed}":\n`, availableEvents.join(', '));
        availableEvents.forEach(event => window.addEventListener(event, eventManager));
        function eventManager(event) {
            const actions = eventMapper(event);
            if (eventManagerDebugMode && actions)
                console.info(actions);
            if (actions)
                executeActions(actions);
        }
        function executeActions(actions) {
            const arrayOfActions = actions.trim().split(' ') || [];
            arrayOfActions.forEach(fn => {
                if (eventManagerDebugMode)
                    console.log(`Calling function ${fn}()`);
                if (existFunction(fn))
                    window[fn]();
            });
        }
        function eventMapper(event) {
            const element = event.target;
            const type = event.type;
            if (!element || !element.attributes)
                return null;
            const eventName = eventManagerPrefixed + type;
            const eventTrigger = element.attributes.getNamedItem(eventName);
            if (eventTrigger && eventTrigger.value)
                return eventTrigger.value;
            return null;
        }
        function existFunction(name) {
            return typeof window[name] === 'function';
        }
    }
})();
