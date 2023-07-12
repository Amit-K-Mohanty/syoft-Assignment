import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppData } from "./app-date.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (state.url === '/dashboard' && AppData.isAuthenticated) {
            return true
        }
        if (state.url === '/login' && !AppData.isAuthenticated) {
            // this.router.navigate(['/login'])
            return true
        }
        if (state.url === '/login' && AppData.isAuthenticated) {
            this.router.navigate(['/dashboard'])
            return true
        }
        else {
            this.router.navigate(['/welcome'])
            return false
        }

    }
}
