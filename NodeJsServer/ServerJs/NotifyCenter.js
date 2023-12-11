/**
 * @author jxufe淮神
 * @classdesc 观察者类，用于实现事件监听和处理。
 * @description
 * `listener` 类允许你创建一个事件监听器，以便在特定事件发生时执行回调函数。每个监听器包含事件名称、回调函数和执行上下文。
 * 
 * @param {string} eventName - 事件名称
 * @param {Function} callback - 监听到的回调函数
 * @param {object} eventTarget - 执行回调时的上下文对象
 * 
 * @example
 * // 创建一个监听器，监听名为 "myEvent" 的事件
 * const myListener = new listener("myEvent", (param1, param2) => { 
 *     console.log(`监听到事件: 这是参数1: ${param1}, 这是参数2: ${param2}`) 
 * });
 */
class listener {

    /**
     * 
     * @param {string} eventName 事件名称
     * @param {Function} callback 监听到的回调
     * @param {object} eventTarget 执行的对象this
     * @example
     * new listener("myEvent", (param1, param2) => { 
     * console.log(`监听到事件:这是参数1: ${param1},这是参数2:${param2}`) 
     * })
     */
    constructor(eventName, callback, eventTarget) {
        /**
         * 事件名称。
         * @type {string}
         */
        this.eventName = eventName;

        /**
         * 监听到的回调函数。
         * @type {Function}
         * @description 监听到事件后调用此方法。
         */
        this.callback = callback;

        /**
         * 执行回调时的上下文对象。
         * @type {object}
         */
        this.eventTarget = eventTarget;
    }
}


/**
 * @classdesc 事件通知中心，实现事件的监听、派发和移除监听器功能。
 * @class
 * @example
 * NotifyCenter.on("myEvent", (param1, param2) => { 
 *     console.log(`监听到事件: 这是参数1: ${param1}, 这是参数2: ${param2}`) 
 * });
 * NotifyCenter.emit("myEvent", "参数1", param2);
 * NotifyCenter.off("myEvent", myCallback, myEventTarget);
 */
class NotifyCenter {
    /**
     * 单例模式，获取唯一的 NotifyCenter 实例。
     * @type {NotifyCenter}
     */
    static _instance = new NotifyCenter();
    static get Instance() {
        return this._instance
    }

    /**
     * 创建一个新的事件通知中心实例。
     * @constructor
     */
    constructor() {
        /**
         * 事件处理器
         * @type {Map<string,listener>} 
         */
        this._handlers = new Map()
        return NotifyCenter.Instance
    };

    /**
     * @author jxufe淮神
     * @description 添加事件监听器
     * @param {string} eventName - 要监听的事件名称
     * @param {Function} callback - 事件触发时调用的回调函数
     * @param {object} eventTarget - 执行回调时的上下文对象
     * 
     * @example
     * // 添加一个监听器，监听名为 "myEvent" 的事件
     * NotifyCenter.on("myEvent", (param1, param2) => { 
     *     console.log(`监听到事件: 这是参数1: ${param1}, 这是参数2: ${param2}`) 
     * });
     */
    static on(eventName, callback, eventTarget) {
        // 创建一个新的事件监听器
        let newListener = new listener(eventName, callback, eventTarget);

        // 获取当前事件名称下的监听器数组
        let listeners = NotifyCenter.Instance._handlers.get(eventName);

        // 如果数组不存在，则创建一个新数组并添加到 Map 中
        if (!listeners) {
            listeners = new Array();
            NotifyCenter.Instance._handlers.set(eventName, listeners);
        }

        // 将新的监听器添加到数组中
        listeners.push(newListener);

        // 输出日志，表示成功添加监听器
        console.log(`${eventName} 事件添加了监听器`);
    };

    /**
     * @author jxufe淮神
     * @description 触发事件
     * @param {string} eventName - 事件名称
     * @param {...any} params - 传递给事件监听器的参数
     * @example
     * // 触发名为 "myEvent" 的事件，并传递参数 "参数1" 和 param2
     * NotifyCenter.emit("myEvent", "参数1", param2);
     */
    static emit(eventName, ...params) {
        console.log("事件派发了a")

        let listeners = NotifyCenter.Instance._handlers.get(eventName)
        if (!listeners) {
            console.log("事件不存在！")
            return
        }
        console.log("事件派发了b")
        listeners.forEach(listenerInstance => {
            // element.callback().apply(Array.prototype.slice(0, 1).apply(arguments));
            //console.log(Array.prototype.slice(0, 1).apply(arguments)) //输出
            //listenerInstance.eventTarget.callback(Array.prototype.slice(0, 1).apply(arguments));
            listenerInstance.callback.apply(listenerInstance.eventTarget, params);
        });
    };

    /**
     * @description 移除事件监听器
     * @param {string} eventName - 要移除监听器的事件名称
     * @param {Function} callback - 要移除的回调函数
     * @param {object} eventTarget - 回调函数绑定的上下文对象
     * 
     * @example
     * // 移除名为 "myEvent" 的事件上绑定的特定回调函数
     * NotifyCenter.off("myEvent", myCallback, myEventTarget);
     */
    static off(eventName, callback, eventTarget) {
        // 获取当前事件名称下的监听器数组
        let listeners = NotifyCenter.Instance._handlers.get(eventName);

        // 如果数组不存在，则直接返回
        if (!listeners) {
            return;
        }

        // 过滤出不需要移除的监听器
        let remainingListeners = listeners.filter(listenerInstance => {
            return !(listenerInstance.callback === callback && listenerInstance.eventTarget === eventTarget);
        });

        // 如果移除后数组为空，从 Map 中删除该事件名称的键
        if (remainingListeners.length === 0) {
            NotifyCenter.Instance._handlers.delete(eventName);
        } else {
            // 否则更新数组
            NotifyCenter.Instance._handlers.set(eventName, remainingListeners);
        }
        console.log(`${eventName} 事件移除了监听器`);
    };

}

module.exports = NotifyCenter;