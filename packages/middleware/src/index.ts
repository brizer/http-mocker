import mockjs from 'http-mockjs'

const middle = (options:object={})=>{
    let app;
    return (req,res,next)=>{
        if(!app){
            mockjs(app,options)
        }
        app = req.app
    }
}

export default middle