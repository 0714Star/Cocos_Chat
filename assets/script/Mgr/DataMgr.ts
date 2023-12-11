
import { User } from '../Itf';

export class DataMgr {
    private constructor() { }
    private static _instance: DataMgr = null
    public static get Instance() {
        if (this._instance === null) {
            this._instance = new DataMgr()
        }

        return this._instance
    }
    public _userData: User = null;

}