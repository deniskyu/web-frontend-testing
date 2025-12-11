import { useEffect, useState } from "react"
import { Context } from "./Context.js"
import axios from "axios";
import axiosAuthGuard from "../helpers/AxiosAuthGuard.js";
import { toast } from "react-toastify";

export default function ContextProvider({children}){

    const url = `${import.meta.env.VITE_BACKEND_URL}`;

    const [itemList, setItemList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [cart, setCart] = useState({});
    const [username, setUsername] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [loadingUser, setLoadingUser] = useState(true);
    const [cookieConsent, setCookieConsent] = useState(false);
    const [orders, setOrders] = useState([]);

    const isLogged = async () => {
        try{
            const response = await axios.post(`${url}/api/cookie/get`, {}, {withCredentials: true});
            if(response.data.success)
                return true;;
            return false;
        }catch(er){}
    }

    const loadCookieConsent = () => {
        const consent = localStorage.getItem("cookieConsent");
        if (consent === "accepted") setCookieConsent("accepted");
        else if (consent === "rejected") setCookieConsent("rejected");
        else setCookieConsent(false);
    };

    const calculateOrdersBool = async () => {
        if(orders)
            orders.forEach((order) => {
                if(order.status !== 'Livrata')
                    setNewOrderBool(true);
        })
    }


    const loadCart = async () => {
        try{
            const logged = await isLogged();
            if(!logged) {
                setCart({});
                return;
            }
            const response = await axiosAuthGuard.get('/api/user/cart');
            if(response.data.success)
                setCart(response.data.cart);
            else setCart({});
        }catch(er){
            setCart({});
        }
    }

    const loadUserOrders = async () => {
        try{
            const logged = await isLogged();
            if(!logged) {
                setOrders([]);
                return;
            }
            const response = await axiosAuthGuard.post(`/api/user/orders/get`, {});
            if(response.data.success) {
                setOrders(response.data.orders);
            }
            else
                setOrders([]);
        }catch(er){
            setOrders([]);
        }

    }

    const loadUserInfo = async () => {
        try{
            const logged = await isLogged();
            if(!logged) {
                setUsername(null);
                setUserRole('');
                await loadCart();
                return;
            }
            const response = await axiosAuthGuard.get('/api/user/logged/info');
            if(response.data.success) {
                setUsername(response.data.data.username);
                setUserRole(response.data.data.role);
                await loadCart();
            } else {
                setCart({});
                return;
            }
        }catch(er){
            console.log(er)
        }finally{
            setLoadingUser(false);
        }
    }

    const cartContain = async () => {
        if (!cart || typeof cart !== "object") return false;

        return Object.values(cart).some(quantity => quantity > 0);
    }

    const addToCart = async (itemId) => {
        try{
            const logged = await isLogged();
            if(!logged){
                setShowLogin(true);
                return;
            }
            const response = await axiosAuthGuard.post('/api/user/cart/add', {itemId});
            if(response.data.success)
                await loadCart();
        }catch(er){
            toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
        }
    }

    const removeFromCart = async (itemId) => {
        try{
            const logged = await isLogged();
            if(!logged){
                setShowLogin(true);
                return;
            }
            const response = await axiosAuthGuard.post('/api/user/cart/remove', {itemId});
            if(response.data.success)
                await loadCart();
        }catch(er){
            toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
        }
    }

    const fetchItemList = async () => {
        try{
            const response = await axios.get(`${url}/api/food/list`);
            if(response.data.success)
                setItemList(response.data.data);
            else setItemList([]);
        }catch(er){
            setItemList([]);
        };
    };

    const fetchCategoryList = async () => {
        try{
            const response = await axios.get(`${url}/api/food/category/list`);
            if(response.data.success)
                setCategoryList(response.data.data);
            else setCategoryList([]);
        }catch(er){
            setCategoryList([]);
        };
    }


    useEffect(() => {
        fetchItemList();
        fetchCategoryList();
        loadCart();
        loadCookieConsent();
        loadUserInfo();
        loadUserOrders();
    }, [])


    const contextValue = {
        itemList,
        categoryList,
        url,
        cart,
        addToCart,
        removeFromCart,
        username,
        setUsername,
        loadUserInfo,
        isLogged,
        showLogin, 
        setShowLogin,
        cartContain,
        userRole,
        setUserRole,
        loadingUser,
        cookieConsent,
        setCookieConsent,
        orders, 
        loadUserOrders,
    };

    return(
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}