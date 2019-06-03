export const ConfigService = {
    ['getConfig'](req,res,next){
        console.log('get config')
        res.json({
            result:1,
            data:'hehe'
        })
    }
}