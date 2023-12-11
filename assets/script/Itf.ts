export interface User {
    username: string,
    password: string,
    nickname: string,
    avatar: string,// 头像名称
}

/**
 * 时间更新
 */
export const EventName = {
    UserDataUpData: "更新最新的用户信息",
    updateContent: "更新聊天框显示",
    renderMessage: "渲染发送的信息"
}