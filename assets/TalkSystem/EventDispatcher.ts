import { _decorator, Component, EventTarget, Node } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('EventDispatcher')
export class EventDispatcher {
    public target: EventTarget = new EventTarget();
    private constructor() { };
    private static _instance: EventDispatcher = new EventDispatcher();
    public static get instance() {
        if (!this._instance) {
            this._instance = new EventDispatcher();
        }
        return this._instance;
    }
}


