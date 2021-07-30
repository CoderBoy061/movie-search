export const initialState = {
  basket: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `cannot remove product (id : ${action.id}) as its no longer available`
        );
      }
      return { ...state, basket: newBasket };

    default:
        return state;
  }
};
export default reducer;
