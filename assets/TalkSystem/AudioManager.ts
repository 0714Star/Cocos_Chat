import { _decorator, AudioClip, AudioSource, Component, error, isValid, Node, resources } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AudioManager")
export class AudioManager {
    private _musicAudio: AudioSource;
    private _effectAudio: AudioSource;
    private static instance: AudioManager;
    private constructor() { }
    private isInit: Boolean = false;
    private _audioSources: Array<AudioSource> = [];
    public static get Instance(): AudioManager {
        if (!this.instance) {
            this.instance = new AudioManager();
        }
        return this.instance;
    }

    init(musicAudio: AudioSource, effectAudio: AudioSource) {
        if (this.isInit) {
            //console.log("已经被初始化");
            return;
        }
        this._musicAudio = musicAudio;
        this._effectAudio = effectAudio; this._audioSources
        this.isInit = true;
    }

    //播放音乐，传参音乐名称
    playMusicAudio(name: string) {
        if (!this.isInit) {
            error("无播放器");
            return;
        }
        if (this._audioSources.length > 0) {
            //console.log("被数组初始化，请用数组的函数");
            return;
        }
        resources.load("audio/" + name, AudioClip, (err, audioClip) => {
            if (err) {
                //console.log("err");
                err
            } else {
                if (this._musicAudio.playing) {
                    this._musicAudio.stop();
                }
                this._musicAudio.clip = audioClip;
                this._musicAudio.play();
                //console.log("AudioPlay")
            }
        });
    }

    //播放音效，传参音效名称
    playEffectAudio(name: string) {
        if (!this.isInit) {
            error("无播放器");

            return;
        }
        if (this._audioSources.length > 0) {
            //console.log("被数组初始化，请用数组的函数");
            return;
        }
        resources.load("audio/" + name, AudioClip, (err, audioClip) => {
            if (err) {
                console.log("err");
                error(err || err.message)
            } else {
                if (this._effectAudio.playing) {
                    this._effectAudio.stop();
                }
                this._effectAudio.clip = audioClip;
                this._effectAudio.play();
            }
        });
    }
    //关闭音乐
    stopMusicAudio() {
        if (this._audioSources.length > 0) {
            //console.log("被数组初始化，请用数组的函数");
            return;
        }
        if (this._musicAudio.playing) {
            this._musicAudio.stop();
        }
    }
    //关闭音效
    stopEffectAudio() {
        if (this._audioSources.length > 0) {
            //console.log("被数组初始化，请用数组的函数");
            return;
        }
        if (this._effectAudio.playing) {
            this._effectAudio.stop();
        }
    }
    //设置音乐音量
    setMusicVolume(volume: number) {
        if (this._audioSources.length > 0) {
            //console.log("被数组初始化，请用数组的函数");
            return;
        }
        this._musicAudio.volume = volume;
    }
    //得到音乐音量
    getMusicVolume() {
        if (this._audioSources.length > 0) {
            //console.log("被数组初始化，请用数组的函数");
            return;
        }
        return this._musicAudio.volume;
    }
    //设置音效音量
    setEffectVolume(volume: number) {
        if (this._audioSources.length > 0) {
            //console.log("被数组初始化，请用数组的函数");
            return;
        }
        this._effectAudio.volume = volume;
    }
    //得到音效音量
    getEffectVolume() {
        if (this._audioSources.length > 0) {
            //console.log("被数组初始化，请用数组的函数");
            return;
        }
        return this._effectAudio.volume;
    }

    //数组初始化
    initWithArray(audioSources: Array<AudioSource>) {
        if (this._audioSources || this._musicAudio) {
            //console.log("已经被初始化");
            return;
        }
        this._audioSources = audioSources;
    }

    //设置播放音乐
    playMusicAudioByIndex(name: string, index: number) {
        if (index > this._audioSources.length - 1) {
            //console.log("索引超出范围");
            return;
        }
        if (this._audioSources.length == 0) {
            //console.log("并未数组初始化");
            return;
        }
        resources.load("audio/" + name, AudioClip, (err, audioClip) => {
            if (err) {
                //console.log("err");
            } else {
                this._audioSources[index].clip = audioClip;
                this._audioSources[index].play();
            }
        });
    }
    //停止播放音乐
    stopMusicAudioByIndex(index: number) {
        if (index > this._audioSources.length - 1) {
            //console.log("索引超出范围");
            return;
        }
        if (this._audioSources.length == 0) {
            //console.log("并未数组初始化");
            return;
        }
        if (this._audioSources[index].playing) this._audioSources[index].stop();
    }
    //设置音乐音量
    setMusicVolumeByIndex(index: number, volume: number) {
        if (index > this._audioSources.length - 1) {
            //console.log("索引超出范围");
            return;
        }
        if (this._audioSources.length == 0) {
            //console.log("并未数组初始化");
            return;
        }
        this._audioSources[index].volume = volume;
    }
    //得到音乐音量
    getMusicVolumeByIndex(index: number) {
        if (index > this._audioSources.length - 1) {
            //console.log("索引超出范围");
            return;
        }
        if (this._audioSources.length == 0) {
            //console.log("并未数组初始化");
            return;
        }
        return this._audioSources[index].volume;
    }
}
