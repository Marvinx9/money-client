import { useContext } from "react";
import { TelemedicinaContext } from "../context/telemedicinaContext";

/**
 * `useTelemedicinaContext` é um hook personalizado que fornece acesso ao contexto de Telemedicina.
 * Esse hook encapsula o `useContext` para o `TelemedicinaContext`, garantindo que ele seja usado dentro de um provedor válido.
 * 
 * @throws {Error} - Lança um erro se o hook for usado fora do `TelemedicinaContext.Provider`.
 * @returns {Object} - O valor do contexto de Telemedicina, que inclui funções e dados para gerenciar sessões de telemedicina.
 */
const useTelemedicinaContext = () => {
  const context = useContext(TelemedicinaContext);

  if (context === undefined) {
    throw new Error("useTelemedicinaContext deve ser usado com TelemedicinaContextProvider");
  }

  return context;
};

export { useTelemedicinaContext };
