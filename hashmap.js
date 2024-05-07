import LinkedList from "./LinkedList.js"

export default class HashMap{
    #initial_capacity = 16;   // inital size of buckets array
    #loadFactor  = 0.75; // when capacity/size is larger, double the size of the buckets array
    #maxLength;
    #capacity;            // size of buckets array
    #length;              // number of items (keys) in the hash table
    #buckets;             // array with buckets

    #c = (Math.sqrt(5)-1)/2; // precomputed constant to be used by #hashByMultiplication() method

    constructor(){
        this.#capacity = this.#initial_capacity;
        this.#computeMaxLength();
        this.#buckets = new Array(this.#capacity);
        this.#resetBuckets();
    }

    #computeMaxLength(){
        this.#maxLength = Math.floor(this.#capacity * this.#loadFactor);
    }

    #resetBuckets(){
        this.#length = 0;
        for (let i=0; i<this.#capacity; i++){
            this.#buckets[i] = new LinkedList();
        } 
    }

    // This method takes a key and produces a hash code with it
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
        return hashCode % this.#capacity;
    }
    #hashByMultiplication(hashCode){
        return Math.floor(this.#capacity * ((hashCode * this.#c) % 1));
    }

    // This method takes two arguments, the first is a key and the second is a value 
    // that is assigned to this key. 
    // If a key already exists, then the old value is overwritten.
    // If there is a collision (when TWO DIFFERENT keys sit inside the same bucket),
    // a new key/value node is appended to the bucked, using a LinkedList
    set(key, value){
        let hashCode = this.hash(key);
        let bucket = this.#buckets[hashCode]; // reference to the bucket linked list
        
        let idx = bucket.find(key);
        if (idx !== null){
            // just update the stored value (no new entry)
            bucket.at(idx).value = value;
        } else {
            bucket.append(key, value);
            this.#length++;

            if (this.#loadFactorViolation()){
                console.log(`>>> Load factor reached (${this.#length} out of ${this.#maxLength}=${this.#capacity}*${this.#loadFactor})\n    Redistributing buckets after doubling capacity!`);
                this.#doubleCapacity();
            }
        }
    }

    #doubleCapacity(){
        this.#capacity *= 2;
        this.#computeMaxLength();
        // Get the current entries before actually doubling the #buckets array
        let entries = this.entries();
        // Reset the buckets array
        this.#buckets = new Array(this.#capacity);
        this.#resetBuckets();
        // Refill the values
        entries.forEach(entry => {
            this.set(entry[0],entry[1]);
        });
    }

    #loadFactorViolation(){
        return this.#length > this.#maxLength;
    }

    // This method takes one argument as a key and returns the value that is assigned 
    // to this key. If a key is not found, return null.
    get(key){
        let hashCode = this.hash(key);
        let bucket = this.#buckets[hashCode]; // reference to the bucket linked list
        
        let idx = bucket.find(key);
        if (idx !== null){
            return bucket.at(idx).value;
        } else {
            return null;
        }
    }

    // This method takes a key as an argument and returns true or false based on whether 
    // or not the key is in the hash map.
    has(key){
        let hashCode = this.hash(key);
        let bucket = this.#buckets[hashCode]; // reference to the bucket linked list
        let idx = bucket.find(key);

        return idx !== null;
    }

    // This method takes a key as an argument. If the given key is in the hash map, it
    // remove the entry with that key and return true. If the key isn’t in the hash map, 
    // it return false.
    remove(key){
        let hashCode = this.hash(key);
        let bucket = this.#buckets[hashCode]; // reference to the bucket linked list
        
        let idx = bucket.find(key);
        if (idx !== null){
            bucket.removeAt(idx);
            this.#length--;
            return true;
        } else {
            return false;
        }
    }

    // This method returns the number of stored keys in the hash map
    length(){
        return this.#length;
    }

    // This method removes all entries in the hash map
    clear(){
        this.#resetBuckets();
    }

    // This method returns an array containing all the keys inside the hash map
    keys(){
        let keys = [];
        
        for (let bucket of this.#buckets){
            keys.push(...bucket.keys);
        }

        return keys;
    }

    // This method returns an array containing all the values inside the hash map
    values(){
        let values = [];
        
        for (let bucket of this.#buckets){
            values.push(...bucket.values);
        }

        return values;
    }


    // This method returns an array that contains each key, value pair.
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
    entries(){
        let entries = [];
        
        for (let bucket of this.#buckets){
            entries.push(...bucket.entries);
        }

        return entries;
    }

    toString(){
        let str = '';
        for (let i=0; i<this.#capacity; i++){
            let bucket = this.#buckets[i];
            if (bucket){
                str += `[${i}] ${bucket.toString()}\n`;
            }
        }
        return str;
    }
}