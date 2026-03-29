import {d} from "./Common.js"
class CustomError extends Error {
    customError = true;
    constructor(Errorname, ...args) {
        "use strict";
        super(...args)
        d.call(this, this, "customError", {
            value: true,
            writable: false
        })
        this.name = Errorname;
    }
}
export{CustomError}
