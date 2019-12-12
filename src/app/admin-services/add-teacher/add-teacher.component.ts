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
  }
  initials = ['Mr.', 'Mrs.', 'Ms.', 'Miss.'];

  model: Teacher;
  branchList = [];

  onSubmit(heroForm: any) {
    this.service.addMember(this.model).subscribe(
      (data: any) => {
      this.formReset(heroForm);
      
    },error => {
      this.formReset(heroForm);
    });
  }

  newTeacher() {
    this.model = new Teacher();
  }

  getBranchList() {
    this.service.getBranches().subscribe((branches: any) => {
      this.branchList = branches;
    })
  }

  formReset(form: any) {
    this.newTeacher();
    form.resetForm({ branch: this.model.branchId, initial: this.model.initial, isAdmin: 'N', isActive: 'Y' });
  }
}
