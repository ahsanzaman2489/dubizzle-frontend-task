import React, {createContext, useState} from 'react';

export const SearchContext: any = createContext({});

export const SearchProvider = (props: { children: any; }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // eslint-disable-next-line react/prop-types
    const {children} = props;

    return (
        <SearchContext.Provider value={
            {
                searchTerm,
                setSearchTerm
            }
        }
        >
            {children}
        </SearchContext.Provider>
    );
};