interface Routes {
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
     * Mock path name
     */
    mockFileName?: string;
    routes?: Routes;
    port?:number;
    responseHeaders?:object;
}

