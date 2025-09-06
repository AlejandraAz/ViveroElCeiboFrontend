// import {useEffect,useState} from "react";
// import { Search } from "lucide-react";
// este componente esta responsivo, y tiene debounce para ajustar en otras pagnas:
// ¿Cómo lo usás desde cualquier página?
// const [query, setQuery] = useState("");
// <SearchBar value={query} onChange={setQuery} placeholder="Buscar usuarios..." />

// const SearchBar = ({ value, onChange, placeholder = "Buscar...",delay = 300 }) => {
//     const [internalValue, setInternalValue] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             onChange(internalValue);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [internalValue, onChange, delay]);

//     useEffect(() => {
//         setInternalValue(value);
//     }, [value]);
//     return (
//         <div className="mb-4 flex justify-center">
//             <div className="w-full sm:w-full md:w-full lg:w-6/12 relative">
//             {/* Icono de lupa */}
//             <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
//                 <Search className="h-5 w-5" />
//             </span>

//             {/* Input */}
//             <input
//                 type="text"
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 placeholder={placeholder}
//                 className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
//             />
//         </div>
//         </div>
//     );
// };

// export default SearchBar;
import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => {
  return (
    <div className="mb-4 relative">
      {/* Lupa (izquierda) */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
        <Search className="h-5 w-5" />
      </span>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {/* Botón limpiar (derecha) */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500"
          aria-label="Limpiar búsqueda"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
