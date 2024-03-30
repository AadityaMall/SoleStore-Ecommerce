import { ADD_TO_WISHLIST,REMOVE_FROM_WISHLIST } from "../constants/wishlistConstant";


export const wishlistReducer = (
  state = {
    wishlistItems: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
        const item = action.payload;
        const isItemExist = state.wishlistItems.find(
          (i) => i.product === item.product
        );
        if (!isItemExist) {
          return {
            ...state,
            wishlistItems: [...state.wishlistItems, item],
          };
        }else{
          return{
            ...state,
            wishlistItems:[...state.wishlistItems]
          }
        }
    case REMOVE_FROM_WISHLIST:
      return{
        ...state,
        wishlistItems:state.wishlistItems.filter((i)=>i.product!==action.payload),
      }
    default:
      return { ...state };
  }
};
