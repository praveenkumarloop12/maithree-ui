import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-services';
import { Branch } from '../../models/branch';
import { Teacher } from '../add-teacher/teacher';
import { Student } from '../../models/student';

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
  stateSelect = "AN";
  memberSelect = "";

  states = [];
  taskmapping = {
    productSelected: {},
    taskSelected: {}
  }
  studentRequest = new Student();

  productDetails = [];

  ngOnInit() {
    this.getBranchList();

    this.states = [
      {
        "key": "AN",
        "name": "Andaman and Nicobar Islands"
      },
      {
        "key": "AP",
        "name": "Andhra Pradesh"
      },
      {
        "key": "AR",
        "name": "Arunachal Pradesh"
      },
      {
        "key": "AS",
        "name": "Assam"
      },
      {
        "key": "BR",
        "name": "Bihar"
      },
      {
        "key": "CG",
        "name": "Chandigarh"
      },
      {
        "key": "CH",
        "name": "Chhattisgarh"
      },
      {
        "key": "DH",
        "name": "Dadra and Nagar Haveli"
      },
      {
        "key": "DD",
        "name": "Daman and Diu"
      },
      {
        "key": "DL",
        "name": "Delhi"
      },
      {
        "key": "GA",
        "name": "Goa"
      },
      {
        "key": "GJ",
        "name": "Gujarat"
      },
      {
        "key": "HR",
        "name": "Haryana"
      },
      {
        "key": "HP",
        "name": "Himachal Pradesh"
      },
      {
        "key": "JK",
        "name": "Jammu and Kashmir"
      },
      {
        "key": "JH",
        "name": "Jharkhand"
      },
      {
        "key": "KA",
        "name": "Karnataka"
      },
      {
        "key": "KL",
        "name": "Kerala"
      },
      {
        "key": "LD",
        "name": "Lakshadweep"
      },
      {
        "key": "MP",
        "name": "Madhya Pradesh"
      },
      {
        "key": "MH",
        "name": "Maharashtra"
      },
      {
        "key": "MN",
        "name": "Manipur"
      },
      {
        "key": "ML",
        "name": "Meghalaya"
      },
      {
        "key": "MZ",
        "name": "Mizoram"
      },
      {
        "key": "NL",
        "name": "Nagaland"
      },
      {
        "key": "OR",
        "name": "Odisha"
      },
      {
        "key": "PY",
        "name": "Puducherry"
      },
      {
        "key": "PB",
        "name": "Punjab"
      },
      {
        "key": "RJ",
        "name": "Rajasthan"
      },
      {
        "key": "SK",
        "name": "Sikkim"
      },
      {
        "key": "TN",
        "name": "Tamil Nadu"
      },
      {
        "key": "TS",
        "name": "Telangana"
      },
      {
        "key": "TR",
        "name": "Tripura"
      },
      {
        "key": "UK",
        "name": "Uttar Pradesh"
      },
      {
        "key": "UP",
        "name": "Uttarakhand"
      },
      {
        "key": "WB",
        "name": "West Bengal"
      }
    ]
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
