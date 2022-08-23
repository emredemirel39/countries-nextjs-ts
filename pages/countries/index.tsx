import { NextPage } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import React, { useState } from 'react';
import { ICountry } from '../../types';
import Link from 'next/link';
import {MdSearch} from 'react-icons/md';

interface IProps {
    countries: ICountry []
}

const Countries:NextPage<IProps> = ({countries}) => {

    const sortedCountries: ICountry[] = countries.sort((a: ICountry, b: ICountry) => a.name.common.localeCompare(b.name.common))
    const setOfRegions = new Set (countries.map(c => c.region));
    const regions = Array.from(setOfRegions);

    const [ search, setSearch ] = useState<string>('');
    const [ filter, setFilter ] = useState<string>('');

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

  return (
    <div className='container mx-auto py-1 lg:py-0 grid gap-4'>
        <div className='w-full flex flex-col lg:flex-row justify-start lg:justify-between gap-4 '>
            <div className='w-96 px-2 py-1 flex justify-center items-center gap-2 border border-solid border-zinc-400'>
                <MdSearch size='1.2em' />
                <input onChange={e => setSearch(e.target.value)} className='w-full outline-none' type="text" placeholder='Search...' />
            </div>
            <select onChange={e => handleFilter(e)} defaultValue='' className='w-fit px-2 py-1 cursor-pointer outline-none border border-solid border-zinc-400' name="filter">
                <option value="" >Filter by region</option>
                {regions.map((region, i) => <option key={i} value={region}>{region}</option> )}
            </select>
        </div>
        <ul className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
            {sortedCountries
             .filter(country => filter == "" ? country : country.region === filter)
             .filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
             .map(country => (
                <li key={country.cca3}>
                    <Link href={`countries/${country.cca3}`}>
                        <div className='shadow-lg bg-indigo-900/5 hover:bg-indigo-900/10 px-1 py-2 cursor-pointer'>
                            <img className='object-scale-down h-48 w-64' src={country.flags.png} alt='flag' />
                            <h2 className='mb-4'><b>{country.name.common}</b></h2>
                            <p><b>Population: </b>{country.population.toLocaleString()}</p>
                            <p><b>Region: </b>{country.region}</p>
                            <p><b>Capital: </b>{country.capital}</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Countries

export const getServerSideProps = async (req: NextRequest, res: NextResponse) => {

    try {
        
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();

        return {
            props: {
                countries
            }
        }

    } catch (error) {
        console.error(error)
    }
}