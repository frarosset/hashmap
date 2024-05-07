import LinkedList from "./LinkedList.js"

export default class HashMap{
    #initial_size = 16;   // inital size of buckets array
    #load_factor  = 0.75; // when capacity/size is larger, double the size of the buckets array
    #size;                // size of buckets array
    #capacity;            // number of items in the hash table
    #buckets;             // array with buckets

    #c = (Math.sqrt(5)-1)/2; // precomputed constant to be used by #hashByMultiplication() method

    constructor(){
        this.#size = this.#initial_size;
        this.#capacity = 0;
        this.#buckets = new Array(this.#size);
        for (let i=0; i<this.#size; i++){
            this.#buckets[i] = new LinkedList();
        }
    }

    hash(key){
        let hashCode = 0;

        const prime = 31;
        for (let i=0; i<key.length; i++){
            hashCode = prime * hashCode + key.charCodeAt(i);
            // Avoid numbers larger than the size of the buckets array.
            // Since the size of the buckets array is set as a multiple of 2, as 
            // it is usually done, the #hashByMultiplication is actually used.
            // Also, to avoid numerical errors while iteratevly converting the 
            // string to a number (the number might indeed quickly become very
            // large), call #hashByMultiplication at each step of the process.
            hashCode = this.#hashByMultiplication(hashCode);
        }
        return hashCode;
    }

    // The simpler #hashByDivision should use a prime buckets size
    // The size can be any number using #hashByMultiplication
    // see https://www.geeksforgeeks.org/what-are-hash-functions-and-how-to-choose-a-good-hash-function/
    #hashByDivision(hashCode){
        return hashCode % this.#size;
    }
    #hashByMultiplication(hashCode){
        return Math.floor(this.#size * ((hashCode * this.#c) % 1));
    }

    set(key, value){
        // todo #2: grow buckets when needed

        let hashCode = this.hash(key);
        let bucket = this.#buckets[hashCode]; // reference to the bucket linked list
        
        let idx = bucket.find(key);
        if (idx !== null){
            bucket.at(idx).value = value;
        } else {
            bucket.append(key, value);
        }
    }

    toString(){
        let str = '';
        for (let i=0; i<this.#size; i++){
            let bucket = this.#buckets[i];
            if (bucket){
                str += `[${i}] ${bucket.toString()}\n`;
            }
        }
        return str;
    }
}