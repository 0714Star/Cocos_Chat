async function loopPrint() {
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    for await (let i of list) {
        console.log(i)
        console.log(i + 1 + '----')
    }
}

async function test() {
    loopPrint()
    console.log("!!")
}
test()