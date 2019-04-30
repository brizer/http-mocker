interface Routes {
    path: string
}


export interface Config {
    /**
     * Mock path name
     */
    mockFileName?: string;
    routes?: Routes;
    port?:number;
}

