import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-services';
import { Branch } from '../../models/branch';
import { States } from '../../models/states';
import { Student } from '../../models/student';

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
  stateSelect = "AN";
  memberSelect = "";
  studentSelect = 0;

  states = [];
  taskmapping = {
    productSelected: 0,
    taskSelected: 0
  }
  studentRequest = new Student();
  productDetails = [];

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
    this.service.getBranches().subscribe((branches:any) =>  {
        this.branchList = branches;
    });
  }
  getAllStudents() {
    this.service.getAllStudents().subscribe((students: any) => {
      this.studentList = students;
    });
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
    this.studentRequest.tasks.push(tempMap);
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
          that = Student.studentDBMapper(br);
        }
      });
    }
    return that;
  }

  getStudent(event: any) {
    let student = this.getStudentById(event);
    this.studentRequest = student;
    this.service.getProductsDetailsForBranch(student.branchId.toString()).subscribe((products: any) => {
      this.productDetails = products;
      this.productList = [];
      this.productDetails.forEach(pro => {
        this.productList.push(pro);
      });
      this.service.getTeachersList(student.branchId.toString()).subscribe((teachersList: any) => {
        this.teachersList = teachersList;
      });
    });
  }

  getDetailsForSelectedBranch(event: any) {
    let branch = this.getBranchById(event);
    this.studentRequest.memberId = 0;
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
    form.resetForm({ stu: 0, branchId: this.studentRequest.branchId, memberId: this.studentRequest.memberId, state: this.studentRequest.state, gender: this.studentRequest.gender});
    this.ngOnInit();
  }
}
