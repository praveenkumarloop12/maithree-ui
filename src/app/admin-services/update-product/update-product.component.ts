import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-services';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  constructor(private service: AppService) { }

  addSuccessMessage = false;
  responseMessage="";
  updateSuccessMessage = false;
  branches=[];
  selectedBranch="";
  productsByBranch=[];
  branchSelect = 0;
  productRequest={
    productId:"",
    productName:"",
    productDescription:"",
    tasks:[],
    branchDetails:[],
    isActivity: ""
  }

  productSelect=""
  branchList=[]
  updateBranchList=[]
  productList=[]
  dropdownBranchList=[]
  tagsBranchList=[]

  addProduct = true;
  updateProduct = false;

  resetFields() {
    this.branches=[];
    this.selectedBranch="";
    this.productsByBranch=[];
    this.branchSelect = 0;
    this.productRequest={
      productId:"",
      productName:"",
      productDescription:"",
      tasks:[],
      branchDetails:[],
      isActivity: ""
    }
    this.productSelect=""
    this.branchList=[]
    this.updateBranchList=[]
    this.productList=[]
    this.dropdownBranchList=[]
    this.tagsBranchList=[]
    this.newAttribute = {};
  }

  ngOnInit() {
    this.getBranchList();
    this.showUpdateProduct();
  }

  getBranchList(){
  	this.service.getBranches().subscribe((branches:any) =>  {
  		this.branchList = branches;
  	})
  }

  addProducts() {
    var that = this;
    if(!this.productRequest ||
      !this.productRequest.productName ||
      !this.productRequest.branchDetails ||
      this.productRequest.branchDetails.length === 0) {
     
        this.service.showError("Please fill in the details")
        return;
    }
    this.service.addProduct(this.productRequest).subscribe((resp:any) =>  {
      if(resp.status) {
        that.responseMessage = "Product Updated Successfully";
      } else {
        that.responseMessage = "Please enter valid details to add product";
      }
      console.log(resp);
      that.resetFields();
      that.getBranchList();
      that.updateSuccessMessage = false;
      that.addSuccessMessage = resp.status;
      that.productRequest.tasks = [];
      that.productRequest.branchDetails = [];
    });
  }

  editProducts(){
    var that = this;
    if(!this.productRequest ||
      !this.productRequest.productName ||
      !this.productRequest.branchDetails ||
      this.productRequest.branchDetails.length === 0) {
        
        this.service.showError("Please fill in the details")
        return;
    }
    this.service.editProduct(this.productRequest).subscribe((resp:any) =>  {
      if(resp.status){
        that.responseMessage = "Product Updated Successfully";
      } else {
        that.responseMessage = "Please enter valid details to update product";
      }
      console.log(resp);
      that.resetFields();
      that.service.getProducts().subscribe((products:any) =>  {
        that.productList = products;
      });
      that.getBranchList();
      that.addSuccessMessage = false;
      that.updateSuccessMessage = resp.status;
      that.productRequest.tasks=[];
      that.productRequest.branchDetails=[];
    })
  }

  getProductsByBranch(id: string) {
  	this.service.getProductListForBranch(id).subscribe((prod:any) => {
  		this.productsByBranch = prod;
  	})
  }
  private newAttribute: any = {};


  addFieldValue() {
    if(!this.newAttribute || !this.newAttribute.name) {
      
      this.service.showError("Please fill in the Task Name and Description")
      return;
    }
    this.productRequest.tasks.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.productRequest.tasks.splice(index, 1);
  }

  submitProduct(isEdit) {
  console.log("isEdit",isEdit)
    if(isEdit) {
      if(!this.productSelect) {
        this.service.showError("Please select the product");
        return;
      }
      this.productRequest.productId = this.productList[this.productSelect].id;
      console.log("Inside submit product",this.productRequest);
      this.editProducts();
    }
    else {
      console.log("Inside submit product",this.productRequest);
      this.addProducts();
    }
  }

  resetBeforeShow() {
    this.resetFields();
    this.responseMessage="";
    this.productRequest.tasks=[];
    this.productRequest.branchDetails=[];
    this.getBranchList();
    this.addSuccessMessage=false;
    this.updateSuccessMessage= false;
  }

  showAddProduct(){
    console.log("In showAddProduct()");
    this.resetBeforeShow();
    this.addProduct = true;
    this.updateProduct = false;
  }

  showUpdateProduct(){
    console.log("In showUpdateProduct()");
    this.resetBeforeShow();
    this.service.getProducts().subscribe((products:any) =>  {
      this.productList = products;
    });
    this.addProduct = false;
    this.updateProduct = true;
  }

  getSelectedProductDetails(){
    this.service.getSelectedProductDetails(this.productList[this.productSelect].id).subscribe((productDetails:any) =>  {
      //this.updateBranchList=productDetails.branches;
      this.productRequest.branchDetails = productDetails.branches;
      this.productRequest.tasks = productDetails.tasks;
      // console.log(this.productList[this.productSelect].productName);
      // console.log(this.productList[this.productSelect].productDescription);
      // console.log(this.productList[this.productSelect].isActivity);
      this.productRequest.productName = this.productList[this.productSelect].name;
      this.productRequest.productDescription = this.productList[this.productSelect].description;
      this.productRequest.isActivity = this.productList[this.productSelect].isActivity;
    });
  }

  getSelectedBranch(){
    var branchSelectedList = this.productRequest.branchDetails;
    var flag=false, that = this;
    branchSelectedList.forEach(function(data){
      if(data.id == that.branchList[that.branchSelect].id){
        flag=true;
        }
    })
    if(!flag){
     this.productRequest.branchDetails.push({
        name : this.branchList[this.branchSelect].name,
        id:this.branchList[this.branchSelect].id
      });
    }
  }
  
  removeBranch(branch){
    for (let branchDetails of this.productRequest.branchDetails) {
      if (branchDetails.id === branch.id) {
        this.productRequest.branchDetails.splice(this.productRequest.branchDetails.indexOf(branchDetails), 1);
          break;
      }
  }
  }
  
  
}
