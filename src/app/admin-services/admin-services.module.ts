import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminServicesComponent } from './admin-services.component';
import { AdminServicesRoutingModule } from './admin-services-routing.module';
import { TargetConfigurationComponent } from './target-configuration/target-configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({
  imports: [
    CommonModule,
    AdminServicesRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    AdminServicesComponent, 
    TargetConfigurationComponent, 
    DashboardComponent, 
    AddBranchComponent, 
    AddProductComponent, 
    AddStudentComponent,
    UpdateStudentComponent,
    AddTeacherComponent,
    UpdateTeacherComponent,
    UpdateProductComponent
  ]
})
export class AdminServicesModule { }
