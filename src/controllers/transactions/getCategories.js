import { getCategoriesService } from '../../services/getCategories.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesService();

        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        console.error('Error in getCategories:', error.message);

        res.status(500).json({ success: false, message: 'Failed to retrieve categories' });
    }
};
