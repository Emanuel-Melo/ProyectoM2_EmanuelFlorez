const errorHandler = (err, req, res, next) => {
    console.error("💥 Error:", err.message);

    if (err.code === "23505") {
        return res.status(400).json({
            message: "Duplicate value (email must be unique)"
        });
    }

    res.status(500).json({
        message: "Internal server error"
    });
};

export default errorHandler;