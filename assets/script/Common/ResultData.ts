export interface ResultData<T> {

    /**
     * 结果码
     */
    code: String;

    /**
     * 结果信息
     */
    message: string;

    /**
     * 结果数据
     */
    data: T;

    /**
     * 结果数据
     */
    isSuccess: boolean;
}