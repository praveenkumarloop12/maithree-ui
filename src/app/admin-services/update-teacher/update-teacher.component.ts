import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../services/app-services';
import { Teacher } from '../add-teacher/teacher';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {
  
  @ViewChild('heroForm') heroForm : NgForm;

  constructor(private service: AppService) {
    this.resetMember();
    this.newTeacher();
  }
  ngOnInit() {
    this.newTeacher();
    this.getMembers();
    this.getBranchList();
  }
  initials = ['Mr.', 'Mrs.', 'Ms.', 'Miss.'];

  model: Teacher;
  
  branchList = [];
  teachersList = [];
  memberSelected: number;
  branchSelected: number;

  onSubmit() {
    this.service.editMember(this.model).subscribe(
      (data: any) => {
      this.service.showSuccess("Task updated successfully");
      this.formReset(this.heroForm);
    },error => {
      this.formReset(this.heroForm);
      this.service.showError("Something went wrong, Please try again.");
    });
  }

  newTeacher() {
    this.model = new Teacher();
  }

  resetMember() {
    this.memberSelected = 0;
  }

  getBranchList() {
    this.service.getBranches().subscribe((branches: any) => {
      this.branchList = branches;
    })
  }

  getMembers() {
    this.teachersList = [];
    this.service.getAllMembersList().subscribe((teachersList:any)=> {
      this.teachersList = teachersList;
    });
  }

  getMember(event: any) {
    let mem: any = this.getMemberById(event.target.value);
    if (mem != null || mem != undefined) {
      this.model = Teacher.createTeacher(mem.name, 
        mem.branch_id, mem.code, mem.contact_no, mem.active, mem.is_admin, mem.id);
    }
  };

  getMemberById(_id: number): any{
    let obj = null;
    if (this.teachersList == null || this.teachersList == undefined) {
      return obj;
    }
    this.teachersList.forEach(mem => {
      if (mem.id == _id) {
        obj = mem;
      }
    });
    return obj;
  }

  formReset(form: any) {
    this.newTeacher();
    this.resetMember();
    form.resetForm({ branchId: this.model.branchId, memberSelected: this.memberSelected,
       initial: this.model.initial, isAdmin: 'N', isActive: 'Y'  });
  }
}
