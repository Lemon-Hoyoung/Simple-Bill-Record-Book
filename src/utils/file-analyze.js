// chained execution function 
function compose(...funcs) { 
    if (funcs.length === 0) { 
        return arg => arg 
    } 
        
    if (funcs.length === 1) { 
        return funcs[0] 
    } 
        
    return funcs.reduce(function reducer(a, b) { 
        return function (...args) { 
            return a(b(...args)) 
        } 
    }) 
}

// wrap data string as an object in .csv file
function CSVFileAnalyze(fileText) {
    if (typeof fileText === "undefined") {
        return;
    }
    const textArray = fileText.split('\n');
    const fileTitleArray = textArray[0].trim().split(',');
    const objArray = [];

    function makeObj(titleArr, str) {
        const strArray = str.trim().split(',');
        const obj = {};
        titleArr.map((item, index) => {
            obj[item] = strArray[index];
            return item;
        });
        return obj;
    }

    textArray.slice(1).map((item) => {
        objArray.push(makeObj(fileTitleArray, item));
        return item;
    });

    return objArray;
}

//find the location of the one whose value of the prop is equal to what we specify in an array with objects 
function objectFindInArray(array, prop, value) {
    let location = -1;
    array.map((item, index) => {
        if (typeof item !== 'object') {
            return item;
        }
        if (location === -1) {
            location = item[prop] === value ? index : -1;
        }
        return item;
    });
    return location;
}

//transform file to text and chained execute function in callbackStack after file readed
function fileReader(file, callbackStack) {
    if (file instanceof File) {
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function() {
            callbackStack instanceof Array && compose(...callbackStack.reverse())(reader.result)
        }

        reader.onerror = function() {
            throw Error(reader.error);
        }
    } else if (typeof file !== undefined) {
        throw Error("非文件格式");
    } else {
        throw Error("未读取到文件")
    }
}

//将对象数组中每个对象中id和name的值建立映射表Map
function buildMap(objArray) {
    const myMap = new Map();
    objArray && objArray.map((item) => {
        myMap.set(item.id, item.name);
        return item;
    });
    return myMap;
}

//对对象数组中的对象元素进行映射转换
function dataMap(dataArray) {
    if (!Array.isArray(dataArray)) {
        return dataArray;
    }

    return dataArray.map((item) => {
        return dataMap.mapProps ? arraylize(dataMap.mapProps).reduce((modified, prop) => {
            return modified[prop] ? {...modified, [prop]: dataMap.mapSet && dataMap.mapSet.get(modified[prop]) === undefined ? modified[prop] : dataMap.mapSet.get(modified[prop])} : {...modified};
        }, item) : item;
    })
}

//对映射转换函数进行注册，指定映射表，映射字段
function mapRegister(func, mapProps, mapSet) {
    if (typeof func === 'function') {
        func.mapProps = mapProps;
        func.mapSet = mapSet;
    }
}

//对对象数组指定后续链式执行的调用栈
function dataFilter(dataArray, callbackStack) {
    if (!Array.isArray(dataArray)) {
        return dataArray;
    }

    return compose(...callbackStack.reverse())(dataArray);
}

//劫持过滤器，如果函数是纯函数则为包含额外操作的全通过滤器
function kidnapFilter(extraFunc) {
    if (typeof extraFunc === "function") {
        return (args) => {
            extraFunc(args);
            return args;
        }
    } else {
        return extraFunc;
    }
}

function incomeCalculate(bill, type) {
    let totalIncome = 0;
    Array.isArray(bill) && bill.map((item) => {
        if (item.type === type) {
            totalIncome = totalIncome + Number(item.amount);
        }
        return item;
    });

    return totalIncome;
}

function itemizeSort(prop, sortOrder = true) {
    return (objArray) => {
        if (objectFindInArray(objArray, prop, undefined) === -1) {
            objArray.sort((a, b) => {
                return sortOrder ? Number(a[prop]) - Number(b[prop]) : Number(b[prop]) - Number(a[prop]);
            });
            if (objectFindInArray(objArray, "type", undefined) === -1) {
                const typeMap = new Map();
                let typeNumber = 0;
                const typeArray = [];
                objArray.map((item) => {
                    if (typeof typeMap.get(item.type) === "undefined") {
                        typeMap.set(item.type, typeNumber);
                        typeArray[typeNumber] = [];
                        typeArray[typeNumber].push(item);
                        typeNumber ++;
                    } else {
                        typeArray[typeMap.get(item.type)].push(item);
                    }
                    return item;
                })
                objArray = typeArray.flat();
            }
            return objArray;
        } else {
            return objArray;
        }
    }
}

//包装为数组
function arraylize(str) {
    return str instanceof Array ? str : [str];
}

export {
    compose,
    CSVFileAnalyze,
    objectFindInArray,
    fileReader,
    buildMap,
    dataMap,
    mapRegister,
    dataFilter,
    kidnapFilter,
    incomeCalculate,
    itemizeSort
}