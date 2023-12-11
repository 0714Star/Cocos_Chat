const ResultData = require("../common/ResultData");

/**
 * 将返回结果序列化
 * @param {*} resultData 
 * @returns 
 */
function ResultStringify(resultData = new ResultData()) {

    return JSON.stringify(resultData)
}

/**
 * 将请求解析为对象
 * @param {*} req 
 * @returns 
 */
function RequestPrase(req) {
    console.log(typeof(req))
    if (typeof(req) === "string") {
        try {
            req = JSON.parse(req)
        } catch (error) {
            console.log("该数据不是JSON格式", typeof(req))
        }
    }
    return req;
}

module.exports = {
    ResultStringify,
    RequestPrase
}