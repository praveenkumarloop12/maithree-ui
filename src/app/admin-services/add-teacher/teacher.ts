export class Teacher {
    public initial: string;
    public name: string;
    public branchId: string;
    public code?: string;
    public contact?: number;
    public isAdmin?: string;
    public isActive?: string;
    public id: number;
    constructor(){
        this.initial = "Mr.";
        this.branchId = "0";
        this.isActive = 'Y';
        this.isAdmin = 'N';
    }
    
    public static createTeacher(name: string, branchId: string, code: string, contact: number, isActive: string, isAdmin: string, id: number): Teacher {
        let that: Teacher = new Teacher();
        if (name == undefined || branchId == undefined || code == undefined) {
            return that;
        }
        that.initial = name.substring(0, name.indexOf('.')) + '.';
        that.branchId = branchId;
        that.name = name.substring(name.indexOf('.')+1);
        that.code = code;
        that.contact = contact;
        that.isActive = isActive;
        that.isAdmin = isAdmin;
        that.id = id;
        return that;
    }
  
  }
  