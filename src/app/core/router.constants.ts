import { Routes } from "@angular/router";
import { AuthGuard } from "../services/auth.guard";

export const ROUTES:Routes = [
    { path: '', redirectTo: 'dashboard',pathMatch:'full' },
    {
        path: 'welcome',
        loadChildren: () => import('../module/welcome/welcome.module').then(m => m.WelcomeModule)
    },
    {   canActivate: [AuthGuard],
        path:'dashboard',
        loadChildren:() => import("../module/dashboard/dashboard.module").then(m => m.DashboardModule)
    },
    {
        path:'login',
        loadChildren:() => import("../module/login/login.module").then(m => m.LogindModule)
    },
    {
        path:'signup',
        loadChildren:() => import("../module/signup/signup.module").then(m => m.SignupModule)
    },
    {
        path: '**', redirectTo: 'dashboard'
    }
    
]