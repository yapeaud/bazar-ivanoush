// import jwt from 'jsonwebtoken';
// import userModel from '../models/userModel.js';

// const authUser = async (req, res, next) => {

//     const token = req.headers.authorization?.replace('Bearer ', '');

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Token manquant. Veuillez vous reconnecter."
//         });
//     }

//     try {
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decode.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({
//             success: false,
//             message: "Token non valide. Veuillez vous reconnecter."
//         });
//     }
// }

// export default authUser;
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'; // Ajustez le chemin

const authUser = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token manquant. Veuillez vous reconnecter."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password'); // Récupérer l'utilisateur
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Utilisateur non trouvé."
            });
        }

        req.user = user; // <-- Remplacez req.userId par req.user
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Token non valide. Veuillez vous reconnecter."
        });
    }
};

export default authUser;