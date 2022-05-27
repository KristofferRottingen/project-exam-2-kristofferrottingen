import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { productsUrl } from '../../api/Api';

function Search() {
    const searchResult = document.querySelector(".search-results");
    const [searchVal, setSearchVal] = useState("");
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        
        async function fetchProucts() {
            try {
                const resp = await fetch(productsUrl);

                if (resp.ok) {
                    const json = await resp.json();
                    setSearchData(json);
                }

            } catch (error) {
			console.log(error);
		    }
        } fetchProucts();
    }, []);

    

  return (
    <div className='searchbar'>
        <input type="text" placeholder='Søk...' onChange={event => {setSearchVal(event.target.value)}}></input>
        <div className='search-results'>
           {searchData.filter((value) => {
                    searchResult.style.display = "flex";

                    if (searchVal === "") {
                        return searchResult.style.display = "none";
                    } else if (value.acf.navn.toLowerCase().includes(searchVal.toLowerCase())) {
                        return value;
                    }
                    return "";
                }).map((value) => {
                    return <Link key={value.id} to={`/detail/${value.id}`}>{value.acf.navn}</Link>
                })
            }
        </div>
    </div>
  )
}

export default Search;
