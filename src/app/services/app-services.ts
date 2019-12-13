import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorage } from '@ngx-pwa/local-storage';

import { UrlService } from './url-config';
import { ToastrService } from 'ngx-toastr';
import { Teacher } from '../admin-services/add-teacher/teacher';



@Injectable()
export class AppService {

    private selectedBranch = new BehaviorSubject<string>("1");
    currentBranch = this.selectedBranch.asObservable();
    private SELECTED_BRANCH:any;

    constructor(private http: HttpClient, private router:Router, private localStorage: LocalStorage, 
        private urlService : UrlService,public toastr: ToastrService) {
            
         }

    getBaseUrl() {
        return this.urlService.getBaseUrl();
    }

    setBranch(branch: string){
        this.SELECTED_BRANCH = branch;
    }
    getBranch(){
        return this.SELECTED_BRANCH;
    }

    getImageBaseUrl(){
      return this.urlService.getBaseUrlForImages();
    }

    logout() {
       console.log("Fallback to login")
       window.localStorage.setItem("mi3userToken", null);
       window.sessionStorage.setItem("isAdmin", null);
       this.router.navigateByUrl('/login')
    }

    getBranches() {
    console.log(this.getBaseUrl()+"/branches");
        return this.http.get(this.getBaseUrl()+"/branches").map((response: Response) => {
        console.log(response);
                let branches = response;
                return branches;
        });
    }

    getSelectedProductDetails(productId : string) {
        return this.http.get(this.getBaseUrl()+"/admin/getProductDetails?productId="+productId).map((response: Response) => {
        console.log(response);
        return response;
    });
    }

    getSelectedStudentDetails(studentId : string) {
        return this.http.get(this.getBaseUrl()+"/student/"+studentId).map((response: Response) => {
        console.log(response);
        return response;
    });
    }

    addProduct(product:any){
      console.log(product);
      return this.http.post(this.getBaseUrl() + "/admin/saveProduct",product)
              .map((response: Response) => {
                  let resp = response;
                  console.log(resp);
                  return resp;
          });
    }
    editProduct(product:any){
      return this.http.post(this.getBaseUrl() + "/admin/editProduct",product)
              .map((response: Response) => {
                  let resp = response;
                  console.log(resp);
                  return resp;
          });
    }

    addStudent(student:any){
      return this.http.post(this.getBaseUrl() + "/admin/addStudent", student);
    }

    addMember(member: Teacher) {
        return this.http.post(this.getBaseUrl() + "/admin/addMember", member);
    };

    editMember(member: Teacher) {
        return this.http.post(this.getBaseUrl() + "/admin/editMember", member);
    };
    
    getAllMembersList() {
        return this.http.get(this.getBaseUrl()+ "/admin/getAllMembers").map((response: Response) => {
               let teachersList = response;
               return teachersList;
       });
   }
   
    editStudent(student:any){
        console.log(student);
        return this.http.post(this.getBaseUrl() + "/admin/editStudent",student)
                .map((response: Response) => {
                    let resp = response;
                    console.log(resp);
                    return resp;
            });
      }

    getTeachersList(branchId: string) {
         return this.http.get(this.getBaseUrl()+"/branches/" +branchId + "/teachers").map((response: Response) => {
                let teachersList = response;
                return teachersList;
        });
    }

    getStudentList(branchId: string) {
        return this.http.get(this.getBaseUrl()+"/branches/" +branchId + "/getStudents").map((response: Response) => {
               let studentList = response;
               return studentList;
       });
   }
   getProductsForStudent(branchId: string, data: any) {
       console.log("Value for data", data);
        return this.http.post(this.getBaseUrl()+"/branches/" +branchId + "/getProductsForStudent",data)
            .map((response: Response) => {
                let resp = response;
                return resp;
        });
    }

    getTasksForProduct(branchId: string, data: any) {
        console.log("Value for data", data);
         return this.http.post(this.getBaseUrl()+"/branches/" +branchId + "/getTasksForProduct",data)
             .map((response: Response) => {
                 let resp = response;
                 return resp;
         });
     }
     saveTasks(branchId: string, data: any) {
        console.log("Value for data", data);
         return this.http.post(this.getBaseUrl()+"/branches/" +branchId + "/saveStudentTracking",data)
             .map((response: Response) => {
                 let resp = response;
                 return resp;
         });
     }


    getProducts(){
         return this.http.get(this.getBaseUrl()+"/admin/getProducts").map((response: Response) => {
                let productList = response;
                return productList;
        });
    }


    //get product and task level details for selected branch in Student page.
    getProductsDetailsForBranch(branchId: string){
         return this.http.get(this.getBaseUrl()+"/admin/getAllProductDetails?branchId="+branchId).map((response: Response) => {
                let productDetails = response;
                return productDetails;
        });
    }

    getProductListForBranch(branchId: string) {
         return this.http.get(this.getBaseUrl()+"/branches/"+branchId + "/products").map((response: Response) => {
                let productList = response;
                return productList;
        });
    }

    saveChoosenProducts(data: any) {
       return this.http.post(this.getBaseUrl() + "/inventories",data)
            .map((response: Response) => {
                let resp = response;
                return resp;
        });
    }

    getSavedProducts(branchId: string) {
        var startDate = moment(new Date()).startOf("day").format("YYYY-MM-DD HH:mm:ss");
        var endDate = moment(new Date()).endOf("day").format("YYYY-MM-DD HH:mm:ss");
         return this.http.get(this.getBaseUrl()+"/inventories/branch/"+branchId+"?startDate="+startDate+"&endDate=" + endDate).map((response: Response) => {
                let productList = response;
                return productList;
        });
    }

    changeBranch(branch: string) {
        this.selectedBranch.next(branch);
    }

    getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let requestOptions = new RequestOptions({ headers: headers});
        return requestOptions;
    }

    setDataInBrowser(data: Object, key: string) {
        this.localStorage.setItem(key, data).subscribe((data) => {
        },(err) => {
            console.log(err)
        });
    }

    getDataFromBrowser(key: string, callback:(d) => void) {
        this.localStorage.getItem<Object>(key).subscribe((data) => {
            callback(data);
        },(err) => {
            console.log(err);
        })
    }

    getJobDetails(id : string){
        var startDate = moment(new Date()).startOf("day").format("YYYY-MM-DD HH:mm:ss");
        var endDate = moment(new Date()).endOf("day").format("YYYY-MM-DD HH:mm:ss");
         return this.http.get(this.getBaseUrl()+"/branchProduct/"+id+"/inventories/?startDate="+startDate+"&endDate=" + endDate).map((response: Response) => {
                let jobsList = response;
                return jobsList;
        });
    }

    updateJobDetails(data: any) {
      return this.http.post(this.getBaseUrl() + "/inventories",[data])
           .map((response: Response) => {
               let resp = response;
               return resp;
       });
   }

   getTargetByBranch (branchId: string) {
     var date = moment(new Date()).startOf("day").format("YYYY-MM-DD HH:mm:ss");
     return this.http.get(this.getBaseUrl()+"/target/branch/"+branchId+"?date=" + date).map((response: Array<object>) => {
        let targetData =response;
        let targetMap = {};
        targetData.forEach(targetObj => {
            targetMap[targetObj['branch_product_id']] = targetObj['target']
        });
        return targetMap;
    });
   }

   getCompletedCountForBranchProduct (branchProductId: string) {
    // weekly - Monday - Sunday
    var startDate = moment(new Date()).startOf("week").add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
    var endDate = moment(new Date()).endOf("week").add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
     return this.http.get(this.getBaseUrl()+"/branchProduct/"+branchProductId+"/count/?startDate="+startDate+"&endDate=" + endDate).map((response: Array<object>) => {
        let completedObj = response
        return completedObj && completedObj.length > 0 ? completedObj[0]["completedCount"] : 0 ;
    });
   }


   login(user: any) {
       return this.http.post(this.getBaseUrl() + "/auth/login",user)
            .map((response: Response) => {
                let resp = response;
                return resp;
        });
    }

   getDetailsOfBranchProduct (branchProductId: string) {
    // weekly - Monday - Sunday
    var startDate = moment(new Date()).startOf("month").format("YYYY-MM-DD HH:mm:ss");
    var endDate = moment(new Date()).endOf("month").format("YYYY-MM-DD HH:mm:ss");
     return this.http.get(this.getBaseUrl()+"/branchProduct/"+branchProductId+"/details/?startDate="+startDate+"&endDate=" + endDate).map((response: Response) => {
        let result = response;
        return result;
    });
   }


   getProductList(date) {
      return this.http.get(this.getBaseUrl() + '/admin/get-target-data?date=' + date)
      .map((response: Response) => {
            let productList = response;
            return productList;
        });
   }

   createOrUpdateTargets(date , targets) {
      return this.http.post(this.getBaseUrl() + '/admin', {date, targets}).map((response: Response) => {
        const result = response;
        return result;
      });
   }

   showSuccess(msg: string) {
    this.toastr.success(msg, 'Success!');
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Oops!');
  }


}
