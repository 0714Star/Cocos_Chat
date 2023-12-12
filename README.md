

# Cocos Chat



## 设计技术

> 后端：NodeJS  ， WebSocket ， http 
>
> 前端：cocos creator + typeScript
>
> 数据库： mysql

## 项目结构

- Cocos Chat : cocos creator 项目
- NodeJsServer : 后端代码
- sql : 数据库的表格式文件



## 快速开始

- 使用Cocos creator 打开 文件 `CocosChat`
- 打开文件夹 `sql`运行mysql脚本建立自己的数据库，里面有几个特殊的用户信息，这些用户的avatar有值
- `cmd`进入`NodeJsServer\ServerJs`执行`ServerRun.js`文件,启动服务器
- CocosChat运行后打开几个用户就可以了