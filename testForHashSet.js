import HashSet from './HashSet.js'

let hashSet = new HashSet();

let key_test = ['Milo','Cody','Fufi','Lucky','Cuki','Oliver','Fiocchetta','Oliver (the first)','Lucky','Milo','Tarta','Rughina','Cana','Rino', 'Pesciolino', 'Rosso'];
for (let i=0; i<key_test.length; i++){
    let key = key_test[i];
    let hashCode = hashSet.hash(key);
    console.log(`\nSetting key '${key}'`);
    console.log(`The hashcode of key '${key}' is ${hashCode}`);
    hashSet.set(key);
    let length = hashSet.length(key);
    console.log(`The current length of the hashSet is ${length}`);
    console.log(hashSet.toString());
}

let getKey_test = ['Argo', 'Citiri', 'Fufetta', ...key_test];
console.log('\n\nTEST .get() method');
for (let i=0; i<getKey_test.length; i++){
    let key = getKey_test[i];
    let storedKey = hashSet.get(key);
    let hasKey = hashSet.has(key);
    console.log(`The entry in key '${key}' is '${storedKey}' (the key ${hasKey ? 'is' : 'is NOT'} present)`);
}

console.log('\n\nTEST .remove(key) method');
for (let i=0; i<getKey_test.length; i++){
    let key = getKey_test[i];
    let entryRemoved = hashSet.remove(key);
    let length = hashSet.length(key);
    console.log(`\nThe entry in key '${key}' ${entryRemoved ? 'has been removed' : 'is NOT present'}`);
    console.log(`The current length of the hashSet is ${length}`);
    console.log(hashSet.toString());
}
console.log('\n\nRe-filling the hashSet');
for (let i=0; i<key_test.length; i++){
    let key = key_test[i];
    hashSet.set(key);
}
console.log(hashSet.toString());

console.log('\n\nClearing the hashSet');
hashSet.clear();
console.log(hashSet.toString());
console.log('\n\nRe-filling the hashSet');
for (let i=0; i<key_test.length; i++){
    let key = key_test[i];
    hashSet.set(key);
}
console.log(hashSet.toString());

console.log('Keys: ', hashSet.keys());

