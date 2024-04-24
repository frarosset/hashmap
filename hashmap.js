// in this first implementation, buckets are simple values, and not linked list yet: todo with linked lists!

class HashMap{
    #initial_size = 16;   // inital size of buckets array
    #load_factor  = 0.75; // when capacity/size is larger, double the size of the buckets array
    #size;                // size of buckets array
    #capacity;            // number of items in the hash table
    #buckets;             // array with buckets

    constructor(){
        this.#size = this.#initial_size;
        this.#capacity = 0;
        this.#buckets = new Array(this.#size).fill(null);
    }
}

let hashMap = new HashMap();