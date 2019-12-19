import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-services';
import { Branch } from '../../models/branch';
import { States } from '../../models/states';
import { Student } from '../../models/student';
import { Task } from '../../models/task';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  constructor(private service: AppService) { }

  branches = [];
  selectedBranch = "";

  displayMessage = false;
  addSuccessMessage = false;
  responseMessage = "";

  branchList = [];
  productList = [];
  taskList = [];
  teachersList = [];
  studentList = [];

  branchSelect = "";
  stateSelect = "TN";
  memberSelect = "";
  studentSelect = 0;

  states = [];
  taskmapping = {
    productSelected: 0,
    taskSelected: 0
  }
  studentRequest = new Student();

  private studentsData;
  ngOnInit() {
    this.getBranchList();
    this.getAllStudents();
    this.states = States.getStates();
  }

  private newAttribute: any = {};

  addFieldValue() {
      this.studentRequest.tasks.push(this.newAttribute);
      this.newAttribute = {};
  }
  getName(stu: any): string {
    let that = "";
    if (stu != null || stu != undefined) {
      if (stu.last_name != null && stu.last_name != undefined) {
        that = stu.last_name;
        that = that.concat(", ");
      }
      if (stu.first_name != null && stu.first_name != undefined) {
        that = that.concat(stu.first_name);
      }
    }
    return that;
  }
  getBranchList(){
    this.branchList = [];
    this.service.getBranches().subscribe((branches:any) =>  {
        this.branchList = branches;
    });
  }
  getAllStudents() {
    this.studentList = [];
    this.service.getAllStudents().subscribe((students: any) => {
      this.studentList = students;
    });
  }

  addTaskToStudent(event: Event) {
    event.preventDefault();
    var tempMap = {}
    var that = this;
    that.productList.forEach(function (product) {
      if (product.id == that.taskmapping.productSelected) {
        tempMap['productName'] = product.name;
        tempMap['productId'] = product.id;
      }
    });
    that.taskList.forEach(function (task) {
      if (task.id == that.taskmapping.taskSelected) {
        tempMap['taskName'] = task.name;
        tempMap['taskId'] = task.id;
      }
    });
    let task = Task.createTask(0, tempMap['taskId'], tempMap['taskName'], tempMap['productId'], tempMap['productName']);
    
    that.studentRequest.tasks.push(task);
  }

  getBranchById(id: number): Branch {
    let branch = new Branch();
    if (this.branchList != null || this.branchList != undefined) {
      this.branchList.forEach(br => {
        if (br.id == id) branch = br;
      });
    }
    return branch;
  }

  getStudentById(id: number): Student {
    let that = new Student();
    if (this.studentList != null || this.studentList != undefined) {
      this.studentList.forEach(br => {
        if (br.student_id == id) {
          return that = Student.studentDBMapper(br);
        }
      });
    }
    return that;
  }

  populateTasksAndProductsByStudentID(id: number) {
    this.service.getTasksAndProductsByStudentID(id).subscribe((task: Task[]) => {
      this.studentRequest.tasks = task;
    });
  }

  getStudent(event: any) {
    let student = this.getStudentById(event);
    this.studentRequest = student;
    this.studentRequest.tasks = [];
    this.populateTasksAndProductsByStudentID(event);
    this.service.getTeachersList(student.branchId.toString()).subscribe((teachersList: any) => {
      this.teachersList = teachersList;
    });

    this.service.getProductsDetailsForBranch(student.branchId.toString()).subscribe((products: any) => {
      this.productList = [];
      this.productList = products;
    });
  }

  getDetailsForSelectedBranch(event: any) {
    let branch = this.getBranchById(event);
    this.studentRequest.memberId = 0;
    this.productList = [];
    if (branch == null || branch == undefined || event == 0) {
      return;
    }
    this.service.getProductsDetailsForBranch(event).subscribe((products: any) => {
      this.productList = products;
      this.service.getTeachersList(event).subscribe((teachersList: any) => {
        this.teachersList = teachersList;
      });
    });
  }
  getProductById(id: number): any {
    let pro: any;
    if (this.productList != null || this.productList != undefined) {
      this.productList.forEach(br => {
        if (br.id == id) pro = br;
      });
    }
    return pro;
  }

  canListTask(id: number): boolean {
    let res = true;
    let that = this;
    let tasks = that.studentRequest.tasks;
    if (tasks != null && tasks != undefined) {
      tasks.forEach(br => {
        if (br.taskId == id) res = false;
      })
    }
    return res;
  }

  getTasksForSelectedProduct(event: any) {
    let that = this;
    that.taskList = [];
    let productDetail = that.getProductById(event.target.value);
    productDetail.tasks.forEach(function (taskDetail) {
      if (that.canListTask(taskDetail.id)) {
        that.taskList.push(taskDetail);
      }
    });
  }

  deleteFieldValue(index) {
    this.studentRequest.tasks.splice(index, 1);
  }

  onSubmit(studentForm: any) {
    this.service.editStudent(this.studentRequest).subscribe(
      (data: any) => {
      this.formReset(studentForm);
      this.service.showSuccess("Record created successfully");
    },error => {
      this.formReset(studentForm);
      this.service.showError("Something went wrong, Please try again.");
    });
  };

  formReset(form: any) {
    this.studentRequest = new Student();
    form.resetForm({ stu: 0, branchId: this.studentRequest.branchId, memberId: this.studentRequest.memberId, 
      state: this.studentRequest.state, gender: this.studentRequest.gender, taskSelected: 0, productselect: 0});
    this.ngOnInit();
  }
}
