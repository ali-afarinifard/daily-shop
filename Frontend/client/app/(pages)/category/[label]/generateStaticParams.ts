import { categoryData } from '@/utils/categories';

export async function generateStaticParams() {
    return categoryData.map(category => ({
        label: category.label
    }));
}