import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-services';
import { Teacher } from './teacher';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  constructor(private service: AppService) {}
  ngOnInit() {
    this.getBranchList();
    this.newTeacher();
    this.resetDisplayMessages();
  }
  initials = ['Mr.', 'Mrs.', 'Ms.', 'Miss.'];

  model: Teacher;
  
  displayMessage: boolean;
  addSuccessMessage: boolean;
  responseMessage: string;
  branchList = [];

  onSubmit(heroForm: any) {
    this.displayMessage = true;
    this.service.addMember(this.model).subscribe(
      (data: any) => {
      this.addSuccessMessage = true;
      this.responseMessage = "Teacher Added Successfully";
      this.formReset(heroForm);
      
    },error => {
      this.addSuccessMessage = error.ok;
      this.responseMessage = "Something went wrong, Please try again.";
      this.formReset(heroForm);
    });
    this.fadeDisplayMessages();
  }

  newTeacher() {
    this.model = new Teacher();
  }

  getBranchList() {
    this.service.getBranches().subscribe((branches: any) => {
      this.branchList = branches;
    })
  }

  fadeDisplayMessages() {
    setTimeout(()=>{
      this.resetDisplayMessages();
    }, 3000);
  }

  resetDisplayMessages() {
    this.displayMessage = false;
    this.addSuccessMessage = false;
    this.responseMessage = "";
  }

  formReset(form: any) {
    this.newTeacher();
    form.resetForm({ branch: this.model.branchId, initial: this.model.initial });
  }
}
