type ErrorObject = Required<Error> & { [prop: string]: any };

declare export function err2obj(err: any): ErrorObject;
declare export function obj2err(err: any): ErrorObject;