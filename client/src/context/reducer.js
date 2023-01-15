const reducer = (state, action) => {
  switch (action.type) {
    case "USUARIO_ACTUALIZADO":
      return { ...state, currentUser: action.payload };

    default:
      throw new Error("No hubo acciones seleccionadas");
  }
};
export default reducer;
