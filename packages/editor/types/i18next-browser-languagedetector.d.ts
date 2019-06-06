export = index;
declare class index {
    static type: string;
    constructor(services: any, ...args: any[]);
    type: any;
    detectors: any;
    addDetector(detector: any): void;
    cacheUserLanguage(lng: any, caches: any): void;
    detect(detectionOrder: any): any;
    init(services: any, ...args: any[]): void;
}
