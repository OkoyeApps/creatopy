// enum ErrorType {
//     USER,
//     SYSTEM
// }

type ErrorType = "USER" | "SYSTEM";

class AppError extends Error {
    date = new Date();
    error_type: ErrorType;

    constructor(message: string, errorType: ErrorType) {
        super(message);
        this.date = new Date();
        this.error_type = errorType;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;
