const INIT_STATE = {
    carts: []
};


export const cartreducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_CART": const IteamIndex = state.carts.findIndex((data) => data._id === action.payload._id);

            if (IteamIndex >=0) {
                state.carts[IteamIndex].qnty += 1
                return {
                    ...state,
                    carts: [...state.carts]
                }
            }
             else {
                const item = { ...action.payload, qnty: 1 }
                return {
                    ...state,
                    carts: [...state.carts, item]
                }
            }
   

        case "RMV_CART": const data = state.carts.filter((el) => el._id !== action.payload);

            return {
                ...state,
                carts: data
            }

        case "RMV_ONE":const IteamIndex_dec = state.carts.findIndex((iteam) => iteam._id === action.payload._id);

            if (state.carts[IteamIndex_dec].qnty >= 1) {
                state.carts[IteamIndex_dec].qnty -= 1

                return {
                    ...state,
                    carts: [...state.carts]
                }
            } else if (state.carts[IteamIndex_dec].qnty === 1) {
                const data = state.carts.filter((el) => el._id !== action.payload);

                return {
                    ...state,
                    carts: data
                }
            }break;

        default:
            return state;
    }
}
