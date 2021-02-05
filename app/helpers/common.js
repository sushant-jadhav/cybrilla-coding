function Common(){}

Common.prototype.htttpWrapper = function(object,res){
    return res.status(object.code).send({
        response:{
            code    : object.code,
            message : object.message
        },
        data : object.data,
    }); 
}

module.exports = new Common();