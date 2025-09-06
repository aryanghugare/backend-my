// This is the first way of the wrapper function 

const aysncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((error) => next(error))
    }

}

export { aysncHandler }



















// Here aysncHandler is a higher order function 
// Examples of Higher order functions are map,filter,forEach etc


// aynscHandler is a wrapper function , which will be useful in many places 
// This wrapper function is using the try catch 



/*
const aysncHandler = (fn) => async(req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

*/