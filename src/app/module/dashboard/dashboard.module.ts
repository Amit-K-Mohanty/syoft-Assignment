import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const routes = [{
    path:'',
    component:DashboardComponent,
}
]
@NgModule({
    declarations:[DashboardComponent],
    imports:[CommonModule,FormsModule,RouterModule.forChild(routes)]
})

export class DashboardModule{}