/* global window */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const AssertionError = require("assert").AssertionError;
const pick = require("lodash/pick");
const omit = require("lodash/omit");
const get = require("lodash/get");

const ErrorProps = ["name", "message", "stack"];
const Errors = {
    AssertionError: AssertionError,
    Error: Error,
    EvalError: EvalError,
    RangeError: RangeError,
    ReferenceError: ReferenceError,
    SyntaxError: SyntaxError,
    TypeError: TypeError
};

if (typeof global === "undefined") {
    if (typeof globalThis === "object") {
        var global = globalThis;
    } else if (typeof window === "object") {
        var global = window;
    }
}

function err2obj(err) {
    if (!(err instanceof Error)) return err;

    return Object.assign({}, pick(err, ErrorProps), omit(err, ErrorProps));
}

function obj2err(obj) {
    if (typeof obj !== "object" ||
        !("name" in obj) ||
        !("message" in obj) ||
        !("stack" in obj)) {
        return obj;
    }

    let ctor = Errors[obj.name] || get(global, obj.name) || Error;
    let err = Object.create(ctor.prototype);

    for (let prop in obj) {
        if (ErrorProps.indexOf(prop) >= 0) {
            Object.defineProperty(err, prop, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: obj[prop]
            });
        } else {
            err[prop] = obj[prop];
        }
    }

    return err;
}

function register(errType) {
    Errors[errType.name] = errType;
}

exports.err2obj = err2obj;
exports.obj2err = obj2err;
exports.register = register;