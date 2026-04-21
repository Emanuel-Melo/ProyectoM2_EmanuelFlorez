const errorHandler = (err, req, res, next) => {
    console.error("💥 Error:", {
        message: err.message,
        code: err.code,
        stack: err.stack
    });

    if (err.code === "23505") {
        return res.status(400).json({
            message: "Duplicate value (email must be unique)"
        });
    }

    if (err.code === "23503") {
        return res.status(400).json({
            message: "Invalid reference (foreign key constraint)"
        });
    }

    if (err.code === "22P02") {
        return res.status(400).json({
            message: "Invalid input syntax"
        });
    }

    if (err.status) {
        return res.status(err.status).json({
            message: err.message
        });
    }

    res.status(500).json({
        message: "Internal server error"
    });
};

export default errorHandler;