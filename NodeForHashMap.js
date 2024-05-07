export default class Node{
    #key;
    #value;
    #next;

    constructor(key=null, value=null, next=null){
        this.#key = key;
        this.#value = value;
        this.#next = next;
    }

    get key(){
        return this.#key;
    }

    get value(){
        return this.#value;
    }

    set value(updatedValue){
        this.#value = updatedValue;
    }

    get next(){
        return this.#next;
    }

    set next(updatedNext){
        this.#next = updatedNext;
    }

    toString(){
        return `(${this.#key}: ${this.#value})`;
    }
}