export default class Node{
    #key;
    #next;

    constructor(key=null, next=null){
        this.#key = key;
        this.#next = next;
    }

    get key(){
        return this.#key;
    }

    get next(){
        return this.#next;
    }

    set next(updatedNext){
        this.#next = updatedNext;
    }

    toString(){
        return `(${this.#key})`;
    }
}