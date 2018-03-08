const promise = new Promise((resolve,reject) => {
    setTimeout(()=>{
    //     resolve({
    //         name: 'Aaron',
    //         age: 35
    //     });
    reject('something went wrong');
    }, 5000);

});

console.log('Before');

promise.then((data) => {
    console.log(data);
}).catch((error)=>{
    console.log('error: ', error);
});

console.log('after');
