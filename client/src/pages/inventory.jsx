import { getProducts, deleteProducts, updateProducts } from "../api/products";
import { useEffect, useState } from "react";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        product_id: "",
        product_name: "",
        quantity: "",
        unit: "",
        price: ""
    });

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await getProducts();
        setProducts(response);
    }

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    }

    const handleDelete = async (productId) => {
        try {
            await deleteProducts(productId);
            alert('Product deleted successfully');
            getAllProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product');
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({
            ...currentProduct,
            [name]: value
        });
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProducts(currentProduct, currentProduct.product_id);
            alert('Product updated successfully');
            setIsEditing(false);
            getAllProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product');
        }
    }

    return (
        <div className="bg-sky-900">
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/IMG_0744.JPEG')" }}>
            <div className="text-3xl mb-6 text-black">Sample Inventory</div>
            <div className="flex items-center justify-center">
                        <button className="border border-blue-500 rounded bg-blue-500 text-white p-3 hover:bg-blue-700"><a href="http://localhost:5173/add-product">Add Product</a></button>
                    </div>

            <div className="w-full flex justify-center">
                <table className="table-auto border-collapse border-4 border-blue-900 w-3/4 bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-lime-900">
                            <th className="border border-fuchsia-800 px-4 py-2">Product ID</th>
                            <th className="border border-fuchsia-800 px-4 py-2">Product Name</th>
                            <th className="border border-fuchsia-800 px-4 py-2">Quantity</th>
                            <th className="border border-fuchsia-800 px-4 py-2">Unit</th>
                            <th className="border border-fuchsia-800 px-4 py-2">Price</th>
                            <th className="border border-fuchsia-800 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="hover:bg-gray-100 border-5">
                                <td className="border border-gray-800 bg-teal-400 px-4 py-2">{product.product_id}</td>
                                <td className="border border-gray-800 bg-teal-400 px-4 py-2">{product.product_name}</td>
                                <td className="border border-gray-800 bg-teal-400 px-4 py-2">{product.quantity}</td>
                                <td className="border border-gray-800 bg-teal-400 px-4 py-2">{product.unit}</td>
                                <td className="border border-gray-800 bg-teal-400 px-4 py-2">{product.price}</td>
                                <td className="border border-gray-800 bg-teal-400 px-4 py-2">
                                    <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(product.product_id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditing && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content bg-indigo-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl text-white mb-4">Edit Product</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-950">Product Name:</label>
                                <input
                                    type="text"
                                    name="product_name"
                                    value={currentProduct.product_name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-950">Quantity:</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={currentProduct.quantity}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-950">Unit:</label>
                                <input
                                    type="text"
                                    name="unit"
                                    value={currentProduct.unit}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-950">Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={currentProduct.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default Inventory;
