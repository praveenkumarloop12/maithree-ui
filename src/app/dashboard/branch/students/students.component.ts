import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../services/app-services';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private service: AppService,private router: Router,
    private formBuilder: FormBuilder) { }

  private branchId: string;
  private teachersList=[];
  // private selectedTeacher ="-1";
  private selectedStudent;
  private selectedProduct;
  //private successMessage=false;
  private responseMessage="Task count updated successfully";
  private showMessage=false;


  form: FormGroup;
  private studentsData;
  private productsData;
  private tasksData;
  ngOnInit() {
    console.log(this.selectedStudent);
  	this.activeRoute.params.subscribe(params => {
      this.branchId = params['id'];
      this.getStudentList(this.branchId);
    });

    this.form = this.formBuilder.group({
      teacher: [null, Validators.required],
    });
  }


  	getTeachersList(id: string) {
  		this.service.getTeachersList(id).subscribe((teachersList:any)=> {
  			this.teachersList = teachersList;
  		})
    }

    getStudentList(id: string) {
      this.service.getDataFromBrowser('selectedTeacher', (teacherData) => {
        this.service.getStudentList(id, teacherData).subscribe((studentList:any)=> {
          this.studentsData = studentList;
        })
      });
    }

    getProductList(id: string) {
      var request = {"studentId" : id};
  		this.service.getProductsForStudent(this.branchId, request).subscribe((productList:any)=> {
  			this.productsData = productList;
  		})
    }

    getTaskList(studentid: string, productid: string) {
      var request =
      {
        "studentId" : studentid,
        "productId" : productid
      };
  		this.service.getTasksForProduct(this.branchId, request).subscribe((taskList:any)=> {
  			this.tasksData = taskList;
  		})
  	}

    getProducts(data){
      this.showMessage = false;
      console.log("check for data", data);
      this.selectedProduct=null;
      if(data.studentId != null && data.studentId != undefined){
        this.selectedStudent=data.studentId;
        this.getProductList(data.studentId);
      }
    }

    getTasks(data){
      console.log("product", data);
      this.selectedProduct=null;
      if(data.productId != null && data.productId != undefined){
        this.selectedProduct=data.productId;
        this.getTaskList(this.selectedStudent,this.selectedProduct);
      }
    }
    submitSave(){
      this.saveTasks();
    }
    saveTasks(){
      var reqBody={
        "branchid": this.branchId,
        "studentId": this.selectedStudent,
        "productId": this.selectedProduct,
        "task": []
      }
      this.tasksData.forEach(task => {
        if(task.assigned)
        reqBody['task'].push(
          {
            "id": task.taskId,
            "name": task.taskName,
            "assigned": task.assigned,
            "target": task.target,
            "completed": task.completed
          }
        );
      });
  		this.service.saveTasks(this.branchId, reqBody).subscribe((productList:any)=> {
  			this.productsData = productList;
      })
      this.selectedStudent=null;
      this.selectedProduct=null;
      this.getStudentList(this.branchId);
      this.showMessage = true;
      this.service.showSuccess("Task updated successfully");
    }
    cancel(){
      this.selectedStudent=null;
      this.selectedProduct=null;
      this.getStudentList(this.branchId);
    }

}
