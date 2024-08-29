

class Base {
    constructor() {
        // super()
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
    // getAbbreviations() {
    //     throw new Error("function not overridden")
    // }
    // getStopwords() {
    //     throw new Error("function not overridden")
    // }
    // getTLDS() {
    //     throw new Error("function not overridden")
    // }
    // getFileExtensionTypes(){
    //     throw new Error("function not overridden")
    // }
}
export default Base