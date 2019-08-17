export type ErrorObject = Required<Error> & { [prop: string]: any };

export declare function err2obj(err: any): ErrorObject;
export declare function obj2err(err: any): ErrorObject;
export declare function register(errType: new (...args: any) => Error): void;