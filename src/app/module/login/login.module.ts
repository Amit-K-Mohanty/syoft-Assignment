import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";


const routes:Routes = [{
    path:'',
    component:LoginComponent,
}
]
@NgModule({
    declarations:[LoginComponent],
    imports:[CommonModule,ReactiveFormsModule,RouterModule.forChild(routes)]
})

export class LogindModule{}