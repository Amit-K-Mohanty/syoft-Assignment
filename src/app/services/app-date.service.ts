import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root"
})
export class AppData implements OnInit {
    static userInfo$ = new BehaviorSubject(null);
    static userInfo = ''
    static isAuthenticated = false; 
    constructor(private storageService: StorageService) {}
    ngOnInit() {
        if (this.storageService.getItems("userInfo") !== null) {
            AppData.userInfo$.next(this.storageService.getItems("userInfo"));
            AppData.isAuthenticated = true;
        }
        AppData.userInfo$.subscribe((res) => {
            this.storageService.setItems("userInfo", res);
            AppData.userInfo = JSON.parse(JSON.stringify(res));
        });
    }
}