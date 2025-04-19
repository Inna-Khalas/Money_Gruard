import { getCategoriesService } from '../../services/getCategories.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

const getCategories = async (req, res) => {
    const categories = await getCategoriesService();
    res.status(200).json({ success: true, data: categories });
};

export default ctrlWrapper(getCategories);
