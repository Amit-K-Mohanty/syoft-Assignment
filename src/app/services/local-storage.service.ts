import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class StorageService {
    constructor() { }
    setItems(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    };
    getItems(key: string) {
        try {
            return JSON.parse(localStorage.getItem(key)!)
        } catch (error) {
            return null
        }
    }
    clearStorage() {
        localStorage.clear();
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }
}