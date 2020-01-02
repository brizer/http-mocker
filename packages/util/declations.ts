
export interface Options {
    port?:number
}

export interface outParams {
    app:object,
    options:Options
}

export interface Routes {
    /**
     * 
     */
    path: string,
    /**
     * Whether to ignore the rule
     */
    ignore: boolean
}


export interface Config {
    /**
     * json schema validator
     */
    $schema?:string;
    /**
     * Mock path name
     */
    mockFileName?: string;
    routes?: Routes;
    port?:number;
    responseHeaders?:object;
    requestHeaders?:object;
}