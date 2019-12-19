import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-services';
import { Branch } from '../../models/branch';
import { States } from '../../models/states';
import { Student } from '../../models/student';
import { Task } from '../../models/task';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

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

  branchSelect = "";
  stateSelect = "TN";
  memberSelect = "";

  states = [];
  taskmapping = {
    productSelected: 0,
    taskSelected: 0
  }
  studentRequest = new Student();
  productDetails = [];

  ngOnInit() {
    this.getBranchList();
    this.states = States.getStates();
  }

  private newAttribute: any = {};

  addFieldValue() {
    this.studentRequest.tasks.push(this.newAttribute);
    this.newAttribute = {};
  }

  getBranchList() {
    this.service.getBranches().subscribe((branches: any) => {
      this.branchList = branches;
    })
  }

  addTaskToStudent(event: Event) {
    event.preventDefault();
    var tempMap = {}
    var that = this;
    this.productList.forEach(function (product) {
      if (product.id == that.taskmapping.productSelected) {
        tempMap['productName'] = product.name;
        tempMap['productId'] = product.id;
      }
    });
    this.taskList.forEach(function (task) {
      if (task.id == that.taskmapping.taskSelected) {
        tempMap['taskName'] = task.name;
        tempMap['taskId'] = task.id;
      }
    });
    let task = Task.createTask(0, tempMap['taskId'], tempMap['taskName'], tempMap['productId'], tempMap['productName']);
    this.studentRequest.tasks.push(task);
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

  getDetailsForSelectedBranch(event: any) {
    let branch = this.getBranchById(event);
    
    this.service.getProductsDetailsForBranch(branch.id.toString()).subscribe((products: any) => {
      this.productDetails = products;
      this.productList = [];
      this.productDetails.forEach(pro => {
        this.productList.push(pro);
      });
      this.service.getTeachersList(branch.id.toString()).subscribe((teachersList: any) => {
        this.teachersList = teachersList;
      });
    });
  }

  getTasksForSelectedProduct(product) {
    var that = this;
    that.taskList = [];
    this.productDetails.forEach(function (productDetail) {
      if (productDetail.id == product) {
        productDetail.tasks.forEach(function (taskDetail) {
          that.taskList.push(taskDetail)
        })
      }
    })
  }

  deleteFieldValue(index) {
    this.studentRequest.tasks.splice(index, 1);
  };

  onSubmit(studentForm: any) {
    this.service.addStudent(this.studentRequest).subscribe(
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
    form.resetForm({ branchId: this.studentRequest.branchId, memberId: this.studentRequest.memberId, state: this.studentRequest.state, gender: this.studentRequest.gender});
  }
}
