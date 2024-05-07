import HashMap from './HashMap.js'

let hashMap = new HashMap();

let key_test = ['Milo','Cody','Fufi','Lucky','Cuki','Oliver','Fiocchetta','Oliver (the first)','Lucky','Milo'];
let value_test = ['cat','dog','cat','dog','cat','cat','cat','cat','again a dog','again a cat'];
for (let i=0; i<key_test.length; i++){
    let key = key_test[i];
    let value = value_test[i];
    let hashCode = hashMap.hash(key);
    console.log(`\nSetting value '${value}' in key '${key}'`)
    console.log(`The hashcode of key '${key}' is ${hashCode}`);
    hashMap.set(key,value);
    console.log(hashMap.toString());
}