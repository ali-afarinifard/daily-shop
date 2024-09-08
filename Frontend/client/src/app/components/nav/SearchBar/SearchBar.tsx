'use client'

import { useEffect, useRef, useState } from "react"
import SearchBarItem from "./SearchBarItem";
import { useSearchProductsQuery } from "@/store/apiSlice";

const SearchBar = () => {

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
            <div className="w-full">
                <input
                    type="search"
                    placeholder="جستجو"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 pl-5 border-[1px] border-slate-300 rounded-md outline-slate-400 w-[22rem]"
                />
            </div>
            {noResults && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-w-[24rem] w-full p-2">
                    هیچ محصولی یافت نشد
                </div>
            )}
            {showResults && results.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 p-1 py-2 max-w-[24rem] max-h-[20rem] overflow-auto w-full">
                    {results.map((product) => (
                        <>
                            <SearchBarItem key={product._id} product={product} onClick={handleClearProductClick} />
                            <hr className="border-[1px] border-slate-200 my-2 last:hidden" />
                        </>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar