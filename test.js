import HashMap from './HashMap.js'

let hashMap = new HashMap();

let key_test = ['Milo','Cody','Fufi','Lucky','Cuki','Oliver','Fiocchetta','Oliver (the first)'];
for (let key of key_test){
    let hashCode = hashMap.hash(key);
    console.log(`\nThe hashcode of key '${key}' is ${hashCode}`);
}