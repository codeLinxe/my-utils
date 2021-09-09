/**
 * @desc 生成count位随机数
 * @param {String|Number} count
 * @returns {string}
 */
function getRandomNum(count = 32) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
        'e',
        'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
        'z'
    ];
    var nums = "";
    if (count && !isNaN(count)) {
        count = Number(count)
    } else {
        count = 32
    }
    
    for (var i = 0; i < count; i++) {
        var id = parseInt(Math.random() * 61);
        nums += chars[id];
    }
    return nums;
}