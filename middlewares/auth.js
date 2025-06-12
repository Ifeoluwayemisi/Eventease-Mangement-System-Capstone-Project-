import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
}

const token = authHeader.split(' ')[1];

try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = decoded;
    next();
} catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
}
};