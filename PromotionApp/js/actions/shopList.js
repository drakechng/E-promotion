export const SET_SHOP = 'SET_SHOP';
export const SET_TAP = 'SET_TAP';

export function setShop(shop: Array) {
    return {
        type: SET_SHOP,
        payload: shop,
    }

}
export function setTap(tap: Array) {
    return {
        type: SET_TAP,
        payload: tap,
    }

}
