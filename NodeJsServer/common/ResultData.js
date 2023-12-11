class ResultData {
    constructor(code = "200", message = "", data = {}, isSuccess = true) {
        this.code = code
        this.data = data
        this.message = message
        this.isSuccess = isSuccess
    }
}

module.exports = ResultData