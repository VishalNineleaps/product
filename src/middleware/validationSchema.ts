import joi from '@hapi/joi'


const productSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().min(100).required(),
    inventory: joi.number().min(1).required(),
    description: joi.string().required()

})

export default productSchema
