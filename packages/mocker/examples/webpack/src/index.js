import Axios from ".0.18.0@axios";

const contentNode = document.querySelector('#j-content')
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