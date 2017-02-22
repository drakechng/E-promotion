
export const SET_SHOP = 'SET_SHOP';


export function setShop(shop: Array) {
    return {
        type: SET_SHOP,
        payload: shop,
    }

}