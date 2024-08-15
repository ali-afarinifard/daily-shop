'use client'

import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"
import SearchBarItem from "./SearchBarItem";
import { getProductsBySearch } from "@/libs/apiUrls";

const SearchBar = () => {

    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<ProductType[]>([]);
    const [noResults, setNoResults] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 3) {
                setResults([]);
                setNoResults(false);
                return;
            }

            try {
                const data = await getProductsBySearch(query);

                setResults(data);
                setNoResults(data.length === 0); // Update noResults state
            } catch (error) {
                console.error('Error fetching search results:', error);
                setNoResults(true);
            }
        };

        fetchResults();
    }, [query]);



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                // setQuery('');
                setResults([]);
                setNoResults(false);
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
        setResults([]);
        setNoResults(false);
    };



    return (
        <div ref={searchBarRef} className="relative w-full">
            <input
                type="text"
                placeholder="جستجو"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 border-[1px] border-slate-300 rounded-md outline-slate-400 w-[24rem]"
            />
            {noResults && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-w-[24rem] w-full p-2">
                    هیچ محصولی یافت نشد
                </div>
            )}
            {results.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 p-1 py-2 max-w-[24rem] h-[20rem] overflow-auto w-full">
                    {results.map((product) => (
                        <SearchBarItem key={product._id} product={product} onClick={handleClearProductClick} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar