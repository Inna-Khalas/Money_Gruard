import { CATEGORIES } from '../constants/index.js';

export const getCategoriesService = async () => {
    try {
        return CATEGORIES;
    } catch (error) {
        console.error('Error in getCategoriesService:', error.message);
        throw new Error('Failed to retrieve categories');
    }
};