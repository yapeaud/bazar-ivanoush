import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Token manquant ou mal formaté."
        });
    }

    // Extraire le token après 'Bearer '
    const token = authHeader.replace('Bearer ', '').trim();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Utilisateur non trouvé."
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Erreur d'authentification:", error);
        res.status(401).json({
            success: false,
            message: "Token non valide ou expiré."
        });
    }
};

export default authUser;