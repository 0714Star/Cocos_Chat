import { _decorator, Component, director, Layers, Node, Scene } from 'cc';
const { ccclass, property } = _decorator;


export class SceneMgr {

    /**
     * 
     * @param sceneName 加载场景
     * @param onload 
     */
    public static loadScene(sceneName, onload: () => void) {

        director.loadScene(sceneName, (error: Error | null, scene?: Scene) => { //加载完成的回调函数
            if (error) {
                throw new Error('Load Error') //加载失败
            }
            if (scene) {
                onload(); // 执行回调
            } else {
                console.warn("场景不存在")
            }
        })

    }

}


