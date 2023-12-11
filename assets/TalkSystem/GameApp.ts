import { _decorator, AudioSource, Component, Node, resources } from 'cc';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('GameApp')
export class GameApp extends Component {

    @property(AudioSource)
    public musicSource: AudioSource | null = null;
    @property(AudioSource)
    public effectSource: AudioSource | null = null;
    protected onLoad(): void {
        this.loadRes()
        AudioManager.Instance.init(this.musicSource, this.effectSource);
    }

    loadRes() {
        console.log("加载资源")
        resources.loadDir("image/head/", (finished: number, total: number) => {

        }, function () {
            console.log("加载完成!")
        })


    }
}


