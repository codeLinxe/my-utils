function debounce(fun, time) {
    let timer
    return function() {
        clearTimeout(timer)
        let args = arguments
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, time)
    }
}

function throttle(fun, time) {
    let t1 = 0 //初始时间
    return function() {
        let t2 = new Date() //当前时间
        if (t2 - t1 > time) {
            fun.apply(this, arguments)
            t1 = t2
        }
    }
}