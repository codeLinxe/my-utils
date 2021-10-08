// https://juejin.cn/post/7016502001911463950
// 对于防抖和节流一个最主观的判断方法就是：在10s内你疯狂点击一个按钮，如果使用了防抖则会只执行一次，而你使用了节流则会每隔一段时间执行一次，这个时间可以自己来掌控。

// 防抖
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

// 节流
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