import { _decorator, Button, Component, EditBox, EventHandler, Node } from 'cc';
import { ReqServer } from './ReqServer';
import { InputValidator } from '../Common/InputEditValidator'
import { SceneMgr } from '../Mgr/SceneMgr';
const { ccclass, property } = _decorator;

@ccclass('Login_RegisterView')
export class Login_RegisterView extends Component {

    @property(Node)
    loginView: Node = null;
    @property(Node)
    registerView: Node = null

    protected onLoad(): void {
        this.loginView.active = true
        this.registerView.active = false
        // let editorInputs: EditBox[] = this.loginView.getComponentsInChildren(EditBox)

        // // 给输入框添加校验器
        // editorInputs.forEach(eidtor => {
        //     eidtor.textChanged.push()
        // });
    }

    /**
     * 界面切换
     */
    viewChange() {
        this.loginView.active = !this.loginView.active
        this.registerView.active = !this.registerView.active
    }

    /**
     * 账号登陆
     */
    login() {

        let username = this.loginView.getChildByName("usernameInput").getComponent(EditBox).string
        let password = this.loginView.getChildByName("passwordInput").getComponent(EditBox).string
        //基本登陆校验
        //TODO
        if (!username || !password) {
            alert("用户名和密码不能为空")
            return
        }
        ReqServer.Instance.clientLogin(username, password); // xhy
    }


    /**
     * 账号注册
     */
    register() {
        let username = this.registerView.getChildByName("usernameInput").getComponent(EditBox).string
        let password = this.registerView.getChildByName("passwordInput").getComponent(EditBox).string
        let confirmPass = this.registerView.getChildByName("confirmPass").getComponent(EditBox).string
        let nickName = this.registerView.getChildByName("nickName").getComponent(EditBox).string
        if (!username || !password || !confirmPass || !nickName) {
            alert("存在空值，非法！")
            return
        }
        if (password !== confirmPass) {
            alert("请确认密码")
            return
        }
        ReqServer.Instance.clientRegister(username, password, nickName) // 先不管登陆和注册
    }
}


