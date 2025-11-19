import userModel from "../models/userModel.js";

//Ajouter des produits au panier de l'utilisateur
const addToCart = async (req, res) => {
    try {
        // Vérifier si l'utilisateur est défini
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Utilisateur non authentifié."
            });
        }

        const { itemId, size } = req.body;
        const userId = req.user._id; // Utiliser l'ID de req.user

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé."
            });
        }

        let cartData = userData.cartData || {}; // Initialiser si undefined

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ success: true, message: "Produit ajouté au panier." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
}

//Mettre a jour la quantite des produits dans le panier de l'utilisateur
const updateCart = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Utilisateur non authentifié."
            });
        }

        const { itemId, size, quantity } = req.body;
        const userId = req.user._id;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé."
            });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity;
            // Supprimer l'entrée si la quantité est <= 0
            if (quantity <= 0) {
                delete cartData[itemId][size];
                // Supprimer l'item s'il n'a plus de tailles
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Produit ou taille non trouvée dans le panier."
            });
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ success: true, message: "Panier mis à jour." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
}

//Obtenir les donées du panier de l'utilisateur
const getUserCart = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Utilisateur non authentifié."
            });
        }

        const userId = req.user._id;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé."
            });
        }

        const cartData = userData.cartData || {}; // Retourner {} si undefined

        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
}

export default { addToCart, updateCart, getUserCart }