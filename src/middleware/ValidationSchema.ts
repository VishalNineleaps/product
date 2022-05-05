import joi from '@hapi/joi'

export const productSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().min(100).required(),
    inventory: joi.number().min(1).required(),
    description: joi.string().required()

})

export const userSchema = joi.object({
    username: joi.string().min(2).required(),
    password: joi.string().pattern(/^(?=.*[a-zA-Z])$/).required()
})




/*

(/^
        (?=.*\d)                //should contain at least one digit
        (?=.*[a-z])             //should contain at least one lower case
        (?=.*[A-Z])             //should contain at least one upper case
        [a-zA-Z0-9]{8,}         //should contain at least 8 from the mentioned characters

        $/)

        /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/
  */