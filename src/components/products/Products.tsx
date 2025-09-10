"use client";

import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { database } from "../../../firebase-config";
import { ref, get } from "firebase/database";

const PRODUCTS_PER_PAGE = 12;

async function fetchProducts(page = 1) {
  try {
    const dbRef = ref(database, "products");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const allProducts = Object.values(snapshot.val()); // Obtém todos os produtos do Firebase

      // Lógica de paginação
      const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);

      const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

      return {
        products: paginatedProducts,
        totalPages: totalPages,
      };
    } else {
      console.log("Nenhum dado encontrado no Firebase.");
      return { products: [], totalPages: 1 };
    }
  } catch (error) {
    console.error("Erro ao buscar produtos do Firebase:", error);
    throw new Error("Erro ao carregar produtos do Firebase.");
  }
}

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(currentPage);
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Falha ao carregar produtos:", err);
        setError(
          "Não foi possível carregar os produtos. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col bg-prymary min-h-screen">
      <h1 className="text-4xl font-bold m-4 justify-center flex">Produtos</h1>
      {loading ? (
        <p className="col-span-full text-center text-xl text-white">
          Carregando produtos...
        </p>
      ) : error ? (
        <p className="col-span-full text-center text-xl text-red-500">
          {error}
        </p>
      ) : (
        <div
          className="grid w-full grid-cols-1 sm:grid-cols-2 
        lg:grid-cols-3 max-w-screen-xl mx-auto gap-4 p-4"
        >
          {products.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            products.map((product: any) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-xl text-gray-700">
              Nenhum produto encontrado.
            </p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Products;
