function delay(ms) {
    return new Promise(function (resolve){
        setTimeout(function (){
            resolve('good'+1234)

        },ms)
    })
}


let r=32

console.log(r)


delay(3000).then(function (value){
    console.log('выполнилось', value )
    console.log(r)

    r=value
    console.log('Промис выполнился! Результат:', r); // Выводим `result`


})
