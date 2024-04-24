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

    hash(key){
        let hashCode = 0;

        const prime = 31;
        for (let i=0; i<key.length; i++){
            hashCode = prime * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }
}

let hashMap = new HashMap();

key_test = ['Milo','Cody','Fufi','Lucky','Cuki','Oliver','Fiocchetta','Oliver (the first)'];
for (let key of key_test){
    let hashCode = hashMap.hash(key);
    console.log(`\nThe hashcode of key '${key}' is ${hashCode}`);
}