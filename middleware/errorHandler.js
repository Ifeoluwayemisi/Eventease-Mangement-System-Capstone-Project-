 const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack || err.message);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(500).json({
        status: 'error',
        statusCode,
        message
    });
};


export default errorHandler;
