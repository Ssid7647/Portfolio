class Base {
    constructor() {
    }
    get() {
        throw new Error("function not overridden")
    }
    set() {
        throw new Error("function not overridden")
    }
    clear() {
        throw new Error("function not overridden")
    }
    update() {
        throw new Error("function not overridden")
    }
}


export default Base 