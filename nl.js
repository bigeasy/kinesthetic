module.exports =  function (buffer, index) {
    while (index > 1 && (0xc0 & buffer[index]) == 0x80) {
        index--
    }
    return index
}
