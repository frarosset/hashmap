import Node from "./Node.js"

export default class LinkedList{
    #head;
    #tail;
    #size;

    constructor(){
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    // this method adds a new node containing key and value to the end of the list
    append(key, value){
        let newNode = new Node(key, value);

        // the list is not empty (note: no tail = no head)
        if (this.#tail){
            this.#tail.next = newNode;
            this.#tail = newNode;
        } else {
            this.#head = newNode;
            this.#tail = newNode;
        }
        this.#size++;
    }

    // this method adds a new node containing key and value to the start of the list
    prepend(key, value){
        let newNode = new Node(key, value);

        // the list is not empty (note: no tail = no head)
        if (this.#head){
            newNode.next = this.#head;
            this.#head = newNode;
        } else {
            this.#head = newNode;
            this.#tail = newNode;
        }
        this.#size++;
    }

    // this method returns the total number of nodes in the list
    get size(){
        return this.#size;
    }

    // this method returns the first node in the list
    get head(){
        return this.#head;
    }

    // this method returns the last node in the list
    get tail(){
        return this.#tail;
    }

    // this method returns the node at the given index
    at(index){
        if (index<0 || index >= this.#size)
            return null;

        let thisIdx = 0;
        let thisNode = this.#head;
        while (thisIdx != index){
            thisNode = thisNode.next;
            thisIdx++;
        }

        return thisNode;
    }

    
    // this method removes the last element from the list
    // a prev property is not present in Node objects in this implementation,
    // hence you need to find the node preeceding the last one,
    // which will be the new tail
    pop(){
        // the list is not empty (note: no tail = no head)
        if (this.#size == 1) {
            this.#tail = null;
            this.#head = null;
            this.#size = 0;
        } else if (this.#size > 1){
            this.#tail = this.at(this.#size-2);
            this.#tail.next = null;
            this.#size--;
        } // else do nothing to do: the list is empty
    }

    // this method removes the first element from the list
    shift(){
        // the list is not empty (note: no tail = no head)
        if (this.#size == 1) {
            this.#tail = null;
            this.#head = null;
            this.#size = 0;
        } else if (this.#size > 1){
            this.#head = this.#head.next;
            this.#size--;
        } // else do nothing to do: the list is empty
    }

    // this method returns true if the passed in key and value is in the list 
    // and otherwise returns false
    containsNode(key, value){
        let thisNode = this.#head;
        
        while (thisNode != null){
            if (thisNode.key === key && thisNode.value === value)
                return true;
            thisNode = thisNode.next;
        }

        return false;
    }

    // this method returns the index of the node containing key and value, 
    // or null if not found.
    findNode(key, value){
        let thisNode = this.#head;
        let idx = 0;
        
        while (thisNode != null){
            if (thisNode.key === key && thisNode.value === value)
                return idx;
            thisNode = thisNode.next;
            idx++;
        }

        return null;
    }

    // this method returns true if the passed in key is in the list 
    // and otherwise returns false
    contains(key){
        let thisNode = this.#head;
        
        while (thisNode != null){
            if (thisNode.key === key)
                return true;
            thisNode = thisNode.next;
        }

        return false;
    }

    // this method returns the index of the node containing key, 
    // or null if not found.
    find(key){
        let thisNode = this.#head;
        let idx = 0;
        
        while (thisNode != null){
            if (thisNode.key === key)
                return idx;
            thisNode = thisNode.next;
            idx++;
        }

        return null;
    }

    // this method represents the LinkedList objects as strings, 
    // allowing to print them out and preview them in the console.
    // The format should be: ( Node.toString() ) -> ( Node.toString() ) -> ( Node.toString() ) -> null
    toString(){
        let thisNode = this.#head;
        let str = '';
        
        while (thisNode != null){
            str += `${thisNode.toString()} -> `;
            thisNode = thisNode.next;
        }
        str += 'null';

        return str;
    }

    // this method inserts a new node with the provided key and value at the given index.
    insertAt(key, value, index){
        if (index<0 || index > this.#size)
            return null;

        if (index==0){
            this.prepend(key, value);
            return;
        } else if (index== this.#size) {
            this.append(key, value);
            return;
        }
        
        // here we are sure the head / tail will not be modified
        let nodeAtIndex = this.at(index-1);
        let newNode = new Node(key, value, nodeAtIndex.next);
        nodeAtIndex.next = newNode;
        this.#size++;
    }

    // this method remove the node at the given index.
    removeAt(index){
        if (index<0 || index >= this.#size)
            return null;

        if (index==0){
            this.shift();
            return;
        } else if (index == this.#size-1) {
            this.pop();
            return;
        }
        
        // here we are sure the head / tail will not be modified
        let nodeAtIndex = this.at(index-1);
        nodeAtIndex.next = nodeAtIndex.next.next;
        this.#size--;
    }

    get keys(){
        let thisNode = this.#head;
        let keys = [];
        
        while (thisNode != null){
            keys.push(thisNode.key);
            thisNode = thisNode.next;
        }
        return keys;
    }
}
