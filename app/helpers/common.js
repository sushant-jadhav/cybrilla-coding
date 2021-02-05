function Common(){}

Common.prototype.htttpWrapper = function(object,res){
    return res.status(object.code).send({
        response:{
            code    : object.code,
            message : object.message
        },
        data : object.data,
        success:object.success
    });
}

module.exports = new Common();
