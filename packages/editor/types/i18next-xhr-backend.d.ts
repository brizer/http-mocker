export = i18nextXHRBackend;
declare class i18nextXHRBackend {
    static type: string;
    constructor(services: any, ...args: any[]);
    type: any;
    create(languages: any, namespace: any, key: any, fallbackValue: any): void;
    init(services: any, ...args: any[]): void;
    loadUrl(url: any, callback: any): void;
    read(language: any, namespace: any, callback: any): void;
    readMulti(languages: any, namespaces: any, callback: any): void;
}
