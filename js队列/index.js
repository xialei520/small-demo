class Queue {
    constructor() {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
    }

    //进入队列
    enqueue(item) {
        this.items[this.tailIndex] = item;
        this.tailIndex++;
    }
    //聪队列中取出头项
    dequeue() {
        const item = this.items[this.headIndex];
        delete this.items[this.headIndex];
        this.headIndex++;
        return item;
    }
    //从头检视
    peek() {
        return this.items[this.headIndex];
    }
    //获取当前队列中的项目
    get length() {
        return this.tailIndex - this.headIndex;
    }
}

const queue = new Queue();

queue.enqueue(11);
queue.enqueue(8);
queue.enqueue(4);
queue.enqueue(9);
console.log(queue.items)
queue.dequeue();
console.log(queue.items)

queue.peek();
console.log(queue.peek())
queue.length;
console.log(queue.length)
