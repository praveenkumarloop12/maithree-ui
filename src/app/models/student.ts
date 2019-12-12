import { Task } from './task';

export class Student {

    firstName: string;
    middleName: string;
    lastName: string;
    nickName: string;
    guardainName: string;
    phoneNumber: string;
    emailAddress: string;
    address: string;
    state: string;
    pincode: string;
    gender: string;
    dob: string;
    branchId: number;
    memberId: number;
    tasks: any;
    constructor() {
        this.state = "AN";
        this.branchId = 0;
        this.memberId = 0;
        this.gender = "M";
        this.tasks = [];
    }
}