import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
//console.log('Headers reçus:', req.headers);

        // Plusieurs façons possibles d'envoyer le token
        // const token = req.headers.token ||
        //     req.headers.authorization?.replace('Bearer ', '') ||
        //     req.body.token;
        const token = req.headers.authorization?.replace('Bearer ', '');

        //console.log('Token extrait:', token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token manquant. Veuillez vous reconnecter."
            });
        }
        
        // console.log("Token avant envoi:", token);
        // console.log("Type du token:", typeof token);

        // Vérifier que le token a la structure basique d'un JWT
        if (typeof token !== 'string' || !token.includes('.')) {
            return res.status(401).json({
                success: false,
                message: "Format de token invalide."
            });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('Token décodé:', token_decode);

        // Vérification de l'admin - adaptez selon votre logique
        const expectedPayload = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
        // console.log('expectedPayload:', expectedPayload);  // ✅ Et celle-ci
        // console.log('token_decode.data:', token_decode.data);  // ✅ Et celle-ci
        if (token_decode.data !== expectedPayload) {
            return res.status(403).json({ 
                success: false, 
                message: "Accès administrateur refusé." 
            });
        }

        req.user = token_decode;
        next();

    } catch (error) {
        console.log("Erreur JWT détaillée:", error);

        if (error.name === 'JsonWebTokenError') {
            if (error.message === 'jwt malformed') {
                return res.status(401).json({
                    success: false,
                    message: "Token corrompu ou mal formé."
                });
            }
            return res.status(401).json({
                success: false,
                message: "Token invalide."
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expiré. Veuillez vous reconnecter."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Erreur d'authentification."
        });
    }
}

export default adminAuth;