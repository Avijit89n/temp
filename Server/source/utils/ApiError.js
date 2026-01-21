class ApiError extends Error {
    constructor(status, message = "Something went wrong", error=[]) {
        super(message);
        this.status = status;
        this.success = false;
        this.error = error
    }
}

export default ApiError;
