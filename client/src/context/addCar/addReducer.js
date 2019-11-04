import { RECIEVE_INPUT } from '../types';

export default (state, action) => {
    switch (action.type) {
        case RECIEVE_INPUT:
            const { name, value, files } = action.payload;
            if (name === 'photos') {
                return {
                     ...state, photos: [...state.photos, files[0]], previewURLS: [...state.previewURLS, files[0]]  //save photo in photos array and create preview for it and store it in previwArray
                }
            }
            else {
                return {
                    ...state,
                    [name]:value
                }
            }
        default:
            return state;
    }
}