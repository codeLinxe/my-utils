"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callable = exports.throttle = exports.debounce = exports.memo = exports.proxied = exports.partob = exports.partial = exports.compose = exports.chain = void 0;
function chain() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return funcs.slice(1).reduce(function (acc, fn) { return fn(acc); }, funcs[0].apply(funcs, args));
    };
}
exports.chain = chain;
function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return funcs.reverse().reduce(function (acc, fn) { return fn(acc); });
}
exports.compose = compose;
var partial = function (fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        return fn.apply(void 0, __spreadArray(__spreadArray([], args, true), rest, true));
    };
};
exports.partial = partial;
/**
 * Like partial but for unary functions that accept
 * a single object argument
 */
var partob = function (fn, argobj) {
    return function (restobj) {
        return fn(__assign(__assign({}, argobj), restobj));
    };
};
exports.partob = partob;
/**
 * Creates a Proxy object that will dynamically
 * call the handler argument when attributes are
 * accessed
 */
var proxied = function (handler) {
    return new Proxy({}, {
        get: function (target, propertyName) { return handler(propertyName); }
    });
};
exports.proxied = proxied;
var memoize = function (cache, func, keyFunc, ttl) {
    return function callWithMemo() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = keyFunc ? keyFunc.apply(void 0, args) : JSON.stringify({ args: args });
        var existing = cache[key];
        if (existing !== undefined) {
            if (!existing.exp)
                return existing.value;
            if (existing.exp > new Date().getTime()) {
                return existing.value;
            }
        }
        var result = func.apply(void 0, args);
        cache[key] = {
            exp: ttl ? new Date().getTime() + ttl : null,
            value: result
        };
        return result;
    };
};
/**
 * Creates a memoized function. The returned function
 * will only execute the source function when no value
 * has previously been computed. If a ttl (milliseconds)
 * is given previously computed values will be checked
 * for expiration before being returned.
 */
var memo = function (func, options) {
    var _a, _b;
    if (options === void 0) { options = {}; }
    return memoize({}, func, (_a = options.key) !== null && _a !== void 0 ? _a : null, (_b = options.ttl) !== null && _b !== void 0 ? _b : null);
};
exports.memo = memo;
/**
 * Given a delay and a function returns a new function
 * that will only call the source function after delay
 * milliseconds have passed without any invocations.
 *
 * The debounce function comes with a `cancel` method
 * to cancel delayed `func` invocations and a `flush`
 * method to invoke them immediately
 */
var debounce = function (_a, func) {
    var delay = _a.delay;
    var timer = undefined;
    var active = true;
    var debounced = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (active) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                active && func.apply(void 0, args);
                timer = undefined;
            }, delay);
        }
        else {
            func.apply(void 0, args);
        }
    };
    debounced.isPending = function () {
        return timer !== undefined;
    };
    debounced.cancel = function () {
        active = false;
    };
    debounced.flush = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return func.apply(void 0, args);
    };
    return debounced;
};
exports.debounce = debounce;
/**
 * Given an interval and a function returns a new function
 * that will only call the source function if interval milliseconds
 * have passed since the last invocation
 */
var throttle = function (_a, func) {
    var interval = _a.interval;
    var ready = true;
    var timer = undefined;
    var throttled = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!ready)
            return;
        func.apply(void 0, args);
        ready = false;
        timer = setTimeout(function () {
            ready = true;
            timer = undefined;
        }, interval);
    };
    throttled.isThrottled = function () {
        return timer !== undefined;
    };
    return throttled;
};
exports.throttle = throttle;
/**
 * Make an object callable. Given an object and a function
 * the returned object will be a function with all the
 * objects properties.
 *
 * @example
 * ```typescript
 * const car = callable({
 *   wheels: 2
 * }, self => () => {
 *   return 'driving'
 * })
 *
 * car.wheels // => 2
 * car() // => 'driving'
 * ```
 */
var callable = function (obj, fn) {
    /* istanbul ignore next */
    var FUNC = function () { };
    return new Proxy(Object.assign(FUNC, obj), {
        get: function (target, key) { return target[key]; },
        set: function (target, key, value) {
            ;
            target[key] = value;
            return true;
        },
        apply: function (target, self, args) { return fn(Object.assign({}, target)).apply(void 0, args); }
    });
};
exports.callable = callable;
