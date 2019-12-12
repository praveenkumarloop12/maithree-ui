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
    this.resetDisplayMessages();
  }
  initials = ['Mr.', 'Mrs.', 'Ms.', 'Miss.'];

  model: Teacher;
  
  displayMessage: boolean;
  addSuccessMessage: boolean;
  responseMessage: string;
  branchList = [];
  teachersList = [];
  memberSelected: number;
  branchSelected: number;

  onSubmit() {
    this.displayMessage = true;
    this.service.editMember(this.model).subscribe(
      (data: any) => {
      this.addSuccessMessage = true;
      this.responseMessage = "Teacher updated Successfully";
      this.formReset(this.heroForm);
      this.fadeDisplayMessages();
    },error => {
      this.addSuccessMessage = error.ok;
      this.formReset(this.heroForm);
      this.responseMessage = "Something went wrong, Please try again.";
      this.fadeDisplayMessages();
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

  resetDisplayMessages() {
    this.displayMessage = false;
    this.addSuccessMessage = false;
    this.responseMessage = "";
  }

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
    form.resetForm({ branchId: this.model.branchId, memberSelected: this.memberSelected, initial: this.model.initial });
  }

  fadeDisplayMessages() {
    setTimeout(()=>{
      this.resetDisplayMessages();
    }, 3000);
  }
}
