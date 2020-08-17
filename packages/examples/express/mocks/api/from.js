module.exports = function (req) {
    const { query } = req;
    const { type } = query;
    if(type == 1){
        return {
            name:'This is from js and type 1'
        }
    }else{
        return {
            name:'This is from js and type 3'
        }
    }
}