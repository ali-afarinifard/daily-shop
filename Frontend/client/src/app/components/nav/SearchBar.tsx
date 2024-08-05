'use client'

const SearchBar = () => {
    return (
        <div className="flex items-center w-full">

            <input
                autoComplete="off"
                type="text"
                placeholder="جستجو"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 max-w-[24rem]"
            />

        </div>
    )
}

export default SearchBar