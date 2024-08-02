import Link from "next/link"


const CategoryList = () => {
    return (
        <div className="mt-20 grid grid-cols-4 gap-4">
            {/* #1 */}
            <Link href={'/category'} className="bg-bgCategory1 flex items-center justify-center py-8 rounded-xl">

                <h1 className="text-white text-xl">ست</h1>

            </Link>

            {/* #2 */}
            <Link href={'/category'} className="bg-bgCategory2 flex items-center justify-center py-8 rounded-xl">

                <h1 className="text-white text-xl">مانتو</h1>

            </Link>

            {/* #3 */}
            <Link href={'/category'} className="bg-bgCategory3 flex items-center justify-center py-8 rounded-xl">

                <h1 className="text-white text-xl">دانشجویی و اداری</h1>

            </Link>

            {/* #4 */}
            <Link href={'/category'} className="bg-bgCategory4 flex items-center justify-center py-8 rounded-xl">

                <h1 className="text-white text-xl">شلوار</h1>

            </Link>
        </div>
    )
}

export default CategoryList