"use client"


import { useEffect, useRef, useState } from "react";
import SearchBarItem from "../nav/SearchBar/SearchBarItem";
import { CiSearch } from "react-icons/ci";
import { useSearchProductsQuery } from "@/store/apiSlice";


interface CategoryListMobileProps {
    toggleMenu: () => void;
}


const CatSearchBar: React.FC<CategoryListMobileProps> = ({ toggleMenu }) => {

    const [query, setQuery] = useState<string>('');
    const [noResults, setNoResults] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement>(null);


    const { data: results = [], isFetching, isError } = useSearchProductsQuery(query, {
        skip: query.length < 2, // Skip query if the length is less than 2
    });


    useEffect(() => {
        if (!isFetching && results.length === 0 && query.length >= 2) {
            setNoResults(true);
            setShowResults(false);
        } else {
            setNoResults(false);
            setShowResults(true);
        };
    }, [results, isFetching, query]);



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setNoResults(false);
                setShowResults(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const handleClearProductClick = () => {
        // Clear the input and results
        setQuery('');
        setShowResults(false);
        setNoResults(false);
    };


    return (
        <div ref={searchBarRef} className="relative w-full">
            <div className="flex items-center justify-between">
                <input
                    type="search"
                    placeholder="جستجوی محصولات"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 py-4 w-full outline-none"
                />
                <CiSearch size={25} />
            </div>
            {noResults && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-w-[24rem] w-full p-2">
                    هیچ محصولی یافت نشد
                </div>
            )}
            {showResults && results.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 p-1 py-2 w-full max-h-[20rem] overflow-auto">
                    {results.map((product) => (
                        <>
                            <SearchBarItem key={product._id} product={product} onClick={handleClearProductClick} toggleMenu={toggleMenu} />
                            <hr className="border-[1px] border-slate-200 my-2 last:hidden" />
                        </>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CatSearchBar