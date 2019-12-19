export class Task {
    mappingId: number;
    taskId: number;
    taskName: string;
    productId: number;
    productName: string;

    constructor() { }

    static createTask(mappingId: number,
        taskId: number,
        taskName: string,
        productId: number,
        productName: string): Task {
        let that = new Task();
        that.mappingId = mappingId;
        that.productId = productId;
        that.productName = productName;
        that.taskId = taskId;
        that.taskName = taskName;
        return that;
    }
}