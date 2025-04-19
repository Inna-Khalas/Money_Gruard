export const getCategoriesService = async () => {
    try {
        const categories = [
            'Main expenses',
            'Products',
            'Car',
            'Self care',
            'Child care',
            'Household products',
            'Education',
            'Leisure',
            'Other expenses',
            'Entertainment',
        ];

        return categories; 
    } catch (error) {
        console.error('Error in getCategoriesService:', error.message);
        throw new Error('Failed to retrieve categories'); 
    }
};

