import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import reducer from "./reducer";

const initialState = {
  currentUser: null,
  openLogin: false,
  cargando: false,
  alert: { open: false, severity: "info", message: "" },
  perfil: { open: false, file: null, photoURL: "" },
  imagenes: [],
  detalles: { titulo: "", descripcion: "", precio: 0 },
  locacion: { lng: 0, lat: 0 },
  updatedRoom: null,
  deletedImages: [],
  addedImages: [],
  cuartos: [],
  filtroPrecio: 12000,
  filtroDireccion: false,
  filteredRooms: [], // Lo puse en ingles por el nombre largo
  cuarto: null,
  usuarios: [],
  seccion: 0,
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapaRef = useRef();
  const contenedorRef = useRef();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "USUARIO_ACTUALIZADO", payload: currentUser });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch, mapaRef, contenedorRef }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
