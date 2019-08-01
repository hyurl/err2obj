# err2obj

**A tiny tool transfer an Error instance to plain object, and vice versa.**

This tool is used when you need to jsonify an error instance and recover it
afterwards

```ts
type ErrorObject = Required<Error> & { [prop: string]: any };

export declare function err2obj(err: any): ErrorObject;
export declare function obj2err(err: any): ErrorObject;
```