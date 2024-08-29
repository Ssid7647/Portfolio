// var axios = require("axios").default;

import Base from "./base.mjs"
import jsonData from "./data.mjs"







class main extends Base {
    constructor() {
        super();
        this._data = jsonData || {}

    }

    async set() {
        try {
            if (this._data === null) {

                // this._data = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json"), { "encoding": "utf-8" }))
                this._data = jsonData

            }

            return

        } catch (error) {
            console.error(error)
        }
    }
    get(property = null, attribute = null) {
        try {


            if (property !== null && Object.keys(this._data).includes(property) === true) {
                let prop = this._data[property]
                if (attribute !== null) {
                    if (Object.keys(prop).includes(attribute) === true) {
                        return prop[attribute]
                    }
                    else {
                        // console.error(`invalid attribute:[${attribute}] for  property:[${property}]`)
                        return []
                    }

                } else {

                    return prop
                }

            }
            else {
                throw new Error(`invalid property:[${property}]`)
            }

        } catch (error) {
            console.error(error)
            return []
        }
    }
    clear() {
        throw new Error("function not overridden")
    }
    // async update() {
    //     return new Promise(async (resolve, reject) => {
    //         try {

    //             var options = {
    //                 method: 'POST',
    //                 url: process.env.serviceUrl || 'http://127.0.0.1:8181/getUpdates'
    //             };

    //             const response = await axios.request(options)
    //             const data = await response.data

    //             if (data !== false) {


    //                 // console.log("data::::::", data)

    //                 fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(data), { "encoding": "utf-8" })
    //                 this.set()
    //                 this.emit("updates", null)

    //             }
    //             return resolve()


    //         } catch (error) {
    //             return resolve()
    //         }
    //     })
    // }


}


















export default main 