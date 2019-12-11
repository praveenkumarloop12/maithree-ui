import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UrlService } from '../url-config';

import { HttpClient } from '@angular/common/http';
@Injectable()
export class ReportService {

  constructor(private http: HttpClient, private urlService : UrlService) { }

  monthNames = [{"text" : "January", "value":0 } , {"text" :"February","value":1 },
   {"text" :"March","value":2 }, {"text" :"April","value":3 }, {"text" :"May","value":4 }, 
   {"text" :"June","value":5 },
  {"text" :"July","value":6}, {"text" :"August", "value":7 },{"text" :"September","value":8 },
   {"text" :"October","value":9 }, {"text" :"November","value":10 }, {"text" :"December","value":11 },
  ];


  getReportBaseUrl(){
    return this.urlService.getBaseUrl()+"/reports";
  }
  getBaseUrl(){
    return this.urlService.getBaseUrl();
  }
  
  getAllInventoryReport(){
    return this.http.get(this.getReportBaseUrl()+"/inventories/").map((res: any) => {
      let inventries = res;
      return inventries;
    });
  }

  getAllTaskReport(){
    return this.http.get(this.getReportBaseUrl()+"/fetchProductSummary/").map((res: any) => {
      let inventries = res;
      return inventries;
    });
  }

  getStudentsReport(branchID, studentID, date, isCustom, selectedQuarter){
    let url = this.getBaseUrl()+'/branches/'+branchID+'/studentProgress?studentId='+studentID+'&date='+date+'&type=monthly';
    if(isCustom) {
      url = this.getBaseUrl()+'/branches/'+branchID+'/studentProgress?studentId='+studentID+'&date='+date+'&type=quarterly&quarterIndex='+Number(Number(selectedQuarter)+1);
    }
    return this.http.get(url).map((res: any) => {
      let getStudentReport = res;
      return getStudentReport;
    });
  }

  getSummaryTotal(){
    return this.http.get(this.getReportBaseUrl()+"/fetchTotalSummary").map((res: any) => {
      let getSummaryTotal = res;
      return getSummaryTotal;
    });
  }

  getAllInventoryReportByDate(fromDate: any, toDate: any){
    let filterDateURL = this.getFilterDateURL(fromDate, toDate);
    return this.http.get(this.getReportBaseUrl()+"/inventories"+filterDateURL).map((res: any) => {
      let inventries = res;
      return inventries;
    });
  }

  getAllTaskReportByDate(fromDate: any, toDate: any){
    let filterDateURL = this.getFilterDateURL(fromDate, toDate);
    return this.http.get(this.getReportBaseUrl()+"/fetchProductSummary"+filterDateURL).map((res: any) => {
      let inventries = res;
      return inventries;
    });
  }

  getFilterDateURL(fromDate: any, toDate: any) {
    if(this.isEmpty(fromDate) && this.isEmpty(toDate)){
      return "";
    }
    if(!this.isEmpty(fromDate) && this.isEmpty(toDate)) {
      let startDate = fromDate.year+"-"+fromDate.month +"-" + fromDate.day;
      return "?startDate="+startDate;
    }
    if(this.isEmpty(fromDate) && !this.isEmpty(toDate)) {
      let endDate = toDate.year+"-"+toDate.month +"-" + toDate.day;
      return "?endDate="+endDate;
    }
    if(!this.isEmpty(fromDate) && !this.isEmpty(toDate)) {
      let startDate = fromDate.year+"-"+fromDate.month +"-" + fromDate.day;
      let endDate = toDate.year+"-"+toDate.month +"-" + toDate.day;
      return "?startDate="+startDate+"&endDate="+endDate;
    }

  }

  isEmpty(date: object){
    for(var key in date) {
      if(date.hasOwnProperty(key))
          return false;
    }
    return true;
  }


  getInventoryDataBasedOnbranch() {
     return this.http.get(this.getReportBaseUrl()+"/inventories/summary").map((res: any) => {
      let inventries = res;
      return inventries;
    });
  }


  getSummaryBasedOnBranch(branchId) {
    console.log(branchId);
    return this.http.get(this.getReportBaseUrl()+"/inventories/"+branchId+"/summary").map((res: any) => {
      let summary = res;
      return summary;
    });
  }





}
