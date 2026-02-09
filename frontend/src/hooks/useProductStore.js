import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
// import dotenv from "dotenv";

// dotenv.config();

// axios is for http requests
// zustand is for state management

// const BASE_URL = `http://localhost:${process.env.PORT}`;

const BASE_URL = "http://localhost:3000";

// Incorporating the backend CRUD operations to the frontend
export const useProductStore = create((set, get) => ({
    // products state
    products: [],
    loading: false,
    error: null,
    currentProduct: null,

    // form state
    formData: {
        name: "",
        price: "",
        image: ""
    },

    setFormData: (formData) => set({formData}),
    // resetForm: () => set({formData: {name: "", price: "", image: ""}}),

    addProduct: async(e) => {
        e.preventDefault()
        set({loading: true});

        try {
            const { formData } = get();
            await axios.post(`${BASE_URL}/api/products`, formData)
            await get().fetchProducts()
            // get().resetForm()
            toast.success("Product added successfully")
            document.getElementById("add_product_modal").close()
            // close modal
        }
        catch (error) {
            console.log("Error addProduct function", error)
            toast.error("Something went wrong")
        }
    },

    fetchProducts: async () => {
        set({loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/api/products`)
            // data from axios and data2 from controlloe backend
            set({products:response.data.data, error:null})
        } 
        catch (error) {
            if(error.status == 429) set({error:"Rate limit exceeded"})
            else set({error: "Something went wrong"})
        } 
        finally {
            set({loading: false})
        }
     },

     deleteProduct: async(id) => {
        set({loading: true});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`)
            set({products: prev.products.filter(product => product.id !== id), error:null}) 
            toast.success("Product deleted successfully")
        }
        catch (error) {
            console.log("Error deleteProduct function", error)
            toast.error("Something went wrong")
        } 
        finally {
            set({loading: false})
        }
     },

     fetchProduct: async(id) => {
        set({loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`)
            set({currentProduct:response.data.data, error:null})
        } catch (error) {
            console.log("Error fetchProduct function", error)
            set({error: "Something went wrong", currentProduct: null})
        } finally {
            set({loading: false})
        }
     },
     
    updateProduct: async(id) => {
        set({loading: true});
        try {
            const { formData } = get();
            const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData)
            const updatedProduct = response.data.data;
            const updatedProducts = get().products.map((product) => {
            if (product.id === id) {
                return updatedProduct;
            }
            return product;
            });
            set({products: updatedProducts, currentProduct: updatedProduct, error: null})
            toast.success("Product updated successfully")   
        } catch (error) {
            console.log("Error updateProduct function", error.message)
            toast.error("Something went wrong")
        } finally {
            set({loading: false})
        }
    }
}))