import { _decorator, Component, director, error, Node, ResolutionPolicy, resources, view } from 'cc';
import { SceneMgr } from './Mgr/SceneMgr';
const { ccclass, property } = _decorator;

/**
 * 场景管理
 */
@ccclass('gameApp')
export class gameApp extends Component {
    start() {
        director.addPersistRootNode(this.node) //将自己添加为常驻节点
        // view.setDesignResolutionSize(360, 720, ResolutionPolicy.EXACT_FIT)
        // console.log(view.getDesignResolutionSize())
    }


}


