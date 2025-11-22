import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = React.createContext();

const ShopContextProvider = (props) => {

    const currency = "FCFA";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = React.useState('');
    const [showSearch, setShowSearch] = React.useState(false);
    const [cartItems, setCartItems] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const [token, setToken] = React.useState('')
    const navigate = useNavigate();

    // Fonction pour calculer les frais de livraison en fonction de la ville
    const calculateDeliveryFee = (city = '') => {
        return city === '' || city.toLowerCase() === 'abidjan' ? 1500 : 3000;
    };

    // Ajouter au panier
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Sélectionnez la taille du produit.');
            return;
        }

        let cartData = structuredClone(cartItems);
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
        setCartItems(cartData);

        if (token) {
            try {
                //console.log("Token utilisé :", token);
                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch (error) {
                console.error("Erreur détaillée:", error.response?.data || error.message);
                toast.error(error.response?.data?.message || error.message);
            }
        }
    };

    //Obtenir le nombre de produits dans le panier
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    };

    // Mettre a jour la quantité
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch (error) {
                console.error("Erreur détaillée:", error.response?.data || error.message);
                toast.error(error.response?.data?.message || error.message);
            }
        }
    };

    // Calculer le montant du panier
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }
            }
        }
        return totalAmount;
    };

    // Récupérer les données des produits depuis la base de données 
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/products/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Récupérer le panier de l'utilisateur
    const getUserCart = async (token) => {
        try {
            //console.log("Token envoyé dans getUserCart :", token); // <= Ajouté pour déboguer
            if (!token) {
                console.log("Aucun token fourni à getUserCart");
                return;
            }
            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Erreur détaillée:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    React.useEffect(() => {
        getProductsData();
    }, []);

    React.useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) {
            setToken(storedToken);
            getUserCart(storedToken);
        }
    }, [token]);

    const value = {
        products,
        currency,
        calculateDeliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;