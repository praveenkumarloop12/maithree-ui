import { Task } from './task';

export class Student {
    id: string;
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
    tasks: Task[];
    constructor() {
        this.state = "TN";
        this.branchId = 0;
        this.memberId = 0;
        this.gender = "M";
        this.tasks = [];
    }

    static studentDBMapper(data: any) {
        let that = new Student();
        if (data == null || data == undefined) {
            return that;
        }
        if (data.first_name != null || data.first_name != undefined) {
            that.id = data.student_id;
            that.firstName = data.first_name;
            that.middleName = data.middle_name;
            that.lastName = data.last_name;
            that.nickName = data.nick_name;
            that.guardainName = data.guardain_name;
            that.phoneNumber = data.phone_number;
            that.emailAddress = data.email_address;
            that.address = data.address;
            that.state = data.state;
            that.pincode = data.pincode;
            that.gender = data.gender;
            that.dob = data.dob;
            that.branchId = data.branch_id;
            that.memberId = data.member_id;
        }
        return that;
    }
}