class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null // the data property is used to store an object with additional information related to the error. It's a way to attach custom data to the error object when needed.
        this.message = message
        this.success = false
        this.errors = errors

        // production code
        // Useful for debugging and provides information about where the error occurred in the code.
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }