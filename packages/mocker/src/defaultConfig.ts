import { Config } from "http-mockjs-util/declations";

/**
 * Default config object
 */
const config: Config = {
    mockFileName: 'mocks',
    responseHeaders:{
        'Content-Type':'application/json'
    }
}
export default config