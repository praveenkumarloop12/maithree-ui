export class Branch {
    id: number;
    name: string;
    code: string;
    phoneNo: string;
    address: string;
    contactPerson: string;
    createdDate: string;
    createdBy: string;
    isActive: string;

    constructor() {
        this.isActive = 'Y';
    }

    public static createBranch(
        name: string,
        code: string,
        phoneNo: string,
        address: string,
        contactPerson: string,
        isActive: string
    ): Branch {
        let that = new Branch();
        that.name = name;
        that.code = code;
        that.phoneNo = phoneNo;
        that.address = address;
        that.contactPerson = contactPerson;
        that.isActive = isActive;
        return that;
    }
}