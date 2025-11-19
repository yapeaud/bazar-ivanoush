import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = React.createContext();

const ShopContextProvider = (props) => {

    const currency = "FCFA";
    const delivery_fee = 1500;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = React.useState('');
    const [showSearch, setShowSearch] = React.useState(false);
    const [cartItems, setCartItems] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const [token, setToken] = React.useState('')
    const navigate = useNavigate();

    // Ajouter au panier
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Selectionnez la taille du produit.');
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
    }

    //Obtenir le nombre de produits dans le panier
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    // Mettre a jour la quantite
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    // Calculer le montant du panier
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemIfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemIfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

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
    }

    React.useEffect(() => {
        getProductsData();
    }, []);

    React.useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
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
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;