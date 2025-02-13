function delay(ms) {
    return new Promise(function (resolve){
        setTimeout(function (){
            resolve('good'+1234)

        },ms)
    })
}


let r=32

//console.log(r)


delay(3000).then(function (value){
    //console.log('выполнилось', value )
   // console.log(r)

    r=value
        //console.log('Промис выполнился! Результат:', r); // Выводим `result`


})


function delay(ms) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(); // resolve без значения - это тоже ок
        }, ms);
    });
}

function doubleAfter2Seconds(num) {
    return delay(2000).then(function() {
        return num * 2;
    });
}

doubleAfter2Seconds(5).then(function(result) {
    console.log(result); // Выведет 10 через 2 секунды
});

function doubleAndLog(num) {
    return doubleAfter2Seconds(num).then(function(doubledValue) {
        let duble=(doubledValue)
        console.log(duble)
        return duble
        // 1. Вывести в консоль сообщение с удвоенным значением.
        // 2. Вернуть удвоенное значение.
    });
}

doubleAndLog(6);