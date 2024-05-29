"use client";

import { SessionProvider } from "next-auth/react";
import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductsContext = createContext({});

const Provider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    defaultValue: [],
  });

  return (
    <SessionProvider>
      {" "}
      <ProductsContext.Provider
        value={{ selectedProducts, setSelectedProducts }}
      >
        {children}
      </ProductsContext.Provider>
    </SessionProvider>
  );
};

export default Provider;
