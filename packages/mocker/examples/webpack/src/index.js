import Axios from ".0.18.0@axios";

const contentNode = document.querySelector('#j-content')
const pathNode1 = document.querySelector('#j-path-1')
const pathNode2 = document.querySelector('#j-path-2')
const sendNode = document.querySelector('#j-send')
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


Axios.get('/user/12121').then(data=>{
    pathNode1.innerHTML = data.data.name
})

Axios.get('/users/foo/info').then(data=>{
    pathNode2.innerHTML = data.data.name
})