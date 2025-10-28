import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        // On recupere le token de l'utilisateur
        const { token } = req.headers;

        // On verifie si le token existe
        if (!token) {
            return res.status(401).json({ success: false, message: "Connexion non autorisée" });
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

        // On verifie si l'utilisateur est admin
        if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Accès réservé à l'administrateur" });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default adminAuth