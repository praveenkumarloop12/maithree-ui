import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-services';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  constructor(private service: AppService) { }

  branches=[];
  selectedBranch="";

  displayMessage = false;
  addSuccessMessage = false;
  responseMessage = "";

  branchList=[];
  productList=[];
  taskList =[];

  branchSelect="";
  studentSelect="";
  stateSelect="AN";
  states=[];
  taskmapping={
    productSelected:{},
    taskSelected:{}
  }
  studentRequest= {
    "firstName": "",
    "middleName": "",
    "lastName": "",
    "nickName": "",
    "guardainName": "",
    "phoneNumber": "",
    "emailAddress": "",
    "address": "",
    "state": "",
    "pincode": "",
    "gender": "",
    "dob": "",
    "branchId":"",
    "tasks": [
    ]
  }

  productDetails=[];
  private studentsData;
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

  getBranchList(){
    console.log("Branch in student")
      this.service.getBranches().subscribe((branches:any) =>  {
        this.branchList = branches;
      })
  }

  getSelectedTask(data){
    console.log("check for value", data);
    console.log("taskmapping", this.taskmapping);
  }

  addTaskToStudent(){
    console.log("that.productList",this.productList)
    console.log("that.taskList",this.taskList)
    console.log("this.productDetails",this.productDetails)
    var tempMap={}
    var that=this;
    this.productList.forEach(function(product){
      if(product.id == that.taskmapping.productSelected){
        tempMap['productName']=product.name;
        tempMap['productId']=product.id;
      }
    })
    this.taskList.forEach(function(task){
      if(task.id == that.taskmapping.taskSelected){
        tempMap['taskName']=task.name;
        tempMap['taskId']=task.id;
      }
    })
    this.studentRequest.tasks.push(tempMap);
  }

  getDetailsForSelectedBranch(){
    var that = this;
    var branchSelected = this.branchSelect;
    var branchId = this.branchList[branchSelected].id;
    this.service.getStudentList(branchId).subscribe((studentList:any)=> {
      this.studentsData = studentList;
    });
    this.service.getProductsDetailsForBranch(branchId).subscribe((products:any) =>  {
      that.productDetails = products;

      that.productList = [];
      this.productDetails.forEach(function(product){
        that.productList.push(product)
      })
    })

    this.studentRequest.branchId = this.branchList[branchSelected].id;
  }
  getDetailsForSelectedStudent(){
    var that = this;
    var studentSelected = this.studentSelect;
    var studentId = this.studentsData[studentSelected].studentId;
    console.log("studentId", studentId);
    this.service.getSelectedStudentDetails(studentId).subscribe((student:any)=> {
      console.log("student",student);
      this.studentRequest = student;
      this.studentRequest.branchId = this.branchList[this.branchSelect].id;
    })
  }

  getTasksForSelectedProduct(product){
    var that = this;
    console.log("product",product)
    that.taskList = [];
    this.productDetails.forEach(function(productDetail){
      if(productDetail.id == product){
        productDetail.tasks.forEach(function(taskDetail){
          that.taskList.push(taskDetail)
        })
      }
      console.log("that.taskList",that.taskList)
    })
  }

  deleteFieldValue(index) {
    this.studentRequest.tasks.splice(index, 1);
  }

  getSelectedState(){
  console.log(this.stateSelect)
    this.studentRequest.state = this.stateSelect
  }

  getSelectedGender(event){
  console.log(event.target.value)
    this.studentRequest.gender = event.target.value
  }

  submitStudent(){
    var that = this;
    this.service.editStudent(this.studentRequest).subscribe((resp:any) =>  {
      that.displayMessage = true;
      that.addSuccessMessage = resp.status;
      if(resp.status){
        that.responseMessage = "Student Updated Successfully";
      } else {
        that.responseMessage = "Please enter valid details to add student";
      }
      console.log(resp,that.addSuccessMessage);
    })
  }
}
