export function deepMerge(a, b) {
    let k;
    for (k in b) {
        a[k] = a[k] && a[k].toString() === '[object Object]' ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
    }
    return a;
}