import Axios from "axios";

const contentNode = document.querySelector('#j-content')
const pathNode1 = document.querySelector('#j-path-1')
const pathNode2 = document.querySelector('#j-path-2')
const pathNode3 = document.querySelector('#j-path-3')
const pathNode4 = document.querySelector('#j-path-4')
const pathNode5 = document.querySelector('#j-path-5')
const pathNode6 = document.querySelector('#j-path-6')
const pathNode7 = document.querySelector('#j-path-7')
const sendNode = document.querySelector('#j-send')
const sendPutNode = document.querySelector('#j-send-put')
contentNode.innerHTML = 'hello world,anyone'

setTimeout(()=>{
    Axios.get('/j/getSomeData.json').then(data=>{
        const name = data;
        contentNode.innerHTML = `hello world,${data.data.name}`
        console.warn(data)
    })
},2000)


sendNode.addEventListener('click',()=>{
    Axios.post('/p/postData.do').then(data=>{
        const name = data;
        contentNode.innerHTML = `hello world,${data.data.name}`
        console.warn(data)
    })
},false)

sendPutNode.addEventListener('click',()=>{
    Axios.put('/p/putData.do').then(data=>{
        const name = data;
        contentNode.innerHTML = `hello world,${data.data.name}`
        console.warn(data)
    })
},false)


Axios.get('/user/12121').then(data=>{
    pathNode1.innerHTML = data.data.name
})

Axios.get('/users/foo/info').then(data=>{
    pathNode2.innerHTML = data.data.name
})


Axios.get('/j/new').then(data=>{
    pathNode3.innerHTML = data.data.name
})

Axios.get('/j/new?otherParam=true').then(data=>console.log(data.data));

Axios.get('/j/new?id=123').then(data=>{
    pathNode4.innerHTML = data.data.name
})
Axios.get('/j/fromjs?type=1').then(data=>{
    pathNode5.innerHTML = data.data.name
})
Axios.get('/j/fromjs?type=2').then(data=>{
    pathNode6.innerHTML = data.data.name
})
Axios.post('/j/validate.json',{
    param1:'string',
    param2:23,
    param3:{
        test:'object'
    }
}).then(data=>{
    pathNode7.innerHTML = data.data.name
})

