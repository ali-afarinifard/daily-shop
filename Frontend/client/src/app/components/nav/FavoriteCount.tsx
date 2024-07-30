'use client'

import { useRouter } from "next/navigation"
import { MdFavoriteBorder } from "react-icons/md";


const FavoriteCount = () => {

    const router = useRouter();

    return (
        <div className="relative cursor-pointer" onClick={() => router.push('/favorites')}>

            <div className="text-3xl">
                <MdFavoriteBorder />
            </div>

            <span className="absolute top-[-10px] right-[-10px] bg-slate-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                0
            </span>

        </div>
    )
}

export default FavoriteCount