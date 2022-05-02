// Middleware are functions which executes during request-response cycle


export const errorHandler = (err: { message: any; stack: any }, req: any, res: { statusCode: any; status: (arg0: any) => void; json: (arg0: { message: any; stack: any }) => void }, next: any) => { //next: to call any further middleware
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}




