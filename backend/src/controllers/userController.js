import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Création du token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_IN });
}

// Route pour la connexion des utilisateurs
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si tous les champs sont remplis
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Tous les champs sont obligatoires." });
        }

        // Vérifier si l'utilisateur existe
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Aucun utilisateur n'a cette adresse e-mail.",
            });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Le mot de passe est incorrect.",
            });
        }

        // Générer le token
        const token = createToken(user._id);    

        res.status(200).json({
            success: true,
            message: "Connexion reussie",
            token,
        });        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Une erreur est survenue lors de la connexion.",    
        });                 
    }
}


// Route pour l'inscription des utilisateur
const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Vérifier si tous les champs sont remplis
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Tous les champs sont obligatoires." });
        }

        // Vérifier si l'utilisateur existe déjà
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "L'utilisateur existe déjà. Veuillez saisir une autre adresse e-mail.",
            });
        }

        // Validation du format d'e-mail
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Le format de l'adresse e-mail est invalide.",
            });
        }

        // Validation du mot de passe fort
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>[\]\\';`~_+=\-]/.test(password);

        if (password.length < 10 || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
            return res.status(400).json({
                success: false,
                message:
                    "Le mot de passe doit contenir au moins 10 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
            });
        }

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer le nouvel utilisateur
        const newUser = await userModel.create({ name, email, password: hashedPassword});

        // Générer le token
        const token = createToken(newUser._id);

        res.status(201).json({
            success: true,
            message: "Utilisateur créé avec succès !",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({
            success: false,
            message: "Une erreur s'est produite lors de la création de l'utilisateur.",
        });
    }
};

// Route pour la connexion de l'admin 
const adminLogin = async (req, res) => {
try {
    // On recupere le token de l'utilisateur
    const { email, password } = req.body;
    // On verifie si le token existe
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email+password, process.env.JWT_SECRET);
        res.status(200).json({ success: true, message: "Connexion reussie", token });
    }else{
        res.status(400).json({ success: false, message: "Identifiant non valide" });
    }
} catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "error.message" });
}
}

export { userLogin, userRegister, adminLogin }