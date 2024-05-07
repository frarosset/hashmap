import HashMap from './HashMap.js'

let hashMap = new HashMap();

let key_test = ['Milo','Cody','Fufi','Lucky','Cuki','Oliver','Fiocchetta','Oliver (the first)','Lucky','Milo'];
let value_test = ['cat','dog','cat','dog','cat','cat','cat','cat','again a dog','again a cat'];
for (let i=0; i<key_test.length; i++){
    let key = key_test[i];
    let value = value_test[i];
    let hashCode = hashMap.hash(key);
    let length = hashMap.length(key);
    console.log(`\nThe current length of the hashMap is ${length}`)
    console.log(`Setting value '${value}' in key '${key}'`);
    console.log(`The hashcode of key '${key}' is ${hashCode}`);
    hashMap.set(key,value);
    console.log(hashMap.toString());
}

let getKey_test = [...key_test, 'Argo', 'Citiri', 'Fufetta'];
console.log('\n\nTEST .get() method');
for (let i=0; i<getKey_test.length; i++){
    let key = getKey_test[i];
    let storedValue = hashMap.get(key);
    let hasKey = hashMap.has(key);
    console.log(`The value in key '${key}' is '${storedValue}' (the key ${hasKey ? 'is' : 'is NOT'} present)`);
}

console.log('\n\nClearing the hashMap');
hashMap.clear();
console.log(hashMap.toString());
console.log('\n\nRe-filling the hashMap');
for (let i=0; i<key_test.length; i++){
    let key = key_test[i];
    let value = value_test[i];
    hashMap.set(key,value);
}
console.log(hashMap.toString());

console.log('Keys: ', hashMap.keys());
console.log('Values: ', hashMap.values());