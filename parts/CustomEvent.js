import { CustomError } from "./CustomError.js"
"use strict";
class CustomEventModule {
    subscribe(eventName, eventCode, args = {}) {
        let option = {};
        if (Object.keys(args).length != 0) {
            option = args;
        } else {
            option = {
                cancelable: false,
                target: this
            }
        }
        if (!this?._events[eventName]) {
            this._events[eventName] = [];
        }
        this._events[eventName].push({
            code: eventCode,
            options: option
        })
    }
    emit(eventName, addprop = {}) {
        let evnames = Object.keys(this._events)
        let r = null;
        if (!evnames.includes(eventName)) throw this.CustomEventError("Missing Emitter Event");
        this._events[eventName].forEach(t => {
            if (!t) return;
            let prop = {
                target: t.options.target,
                ...addprop
            }
            try {
                r = t.code(prop)
            } catch (e) {
                throw this.CustomEventError("Error in Event:" + e.message)
            }
        })
        return r ?? null;
    }
    on(eventName, eventCode) {
        let evnames = Object.keys(this._events)
        if (!evnames.includes(eventName)) {
            throw this.CustomEventError("Event not found:" + eventName)
        }
        this.subscribe(eventName, eventCode)
    }
    constructor() {
        this._events = {};
        this.subscribe("test", (e) => {
            console.log("Event Test Success!")
            return e.target;
        })
    }
    CustomEventError = (...args) => new CustomError("CustomEventError", args)
}
export{CustomEventModule}