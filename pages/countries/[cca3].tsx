import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { ICountry } from '../../types';

interface IProps {
  country: ICountry
}

const Country: NextPage<IProps> = ({country}) => {

  const router = useRouter();

  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
  const arrayFromObjKeys = (obj: object) => obj ? Object.keys(obj).map(key => key + "") : 'N/A';
  const arrayFromObjValues = (obj: object) => obj ? Object.values(obj).map(value => value + "") : 'N/A';
  
  return (
    <div className='container mx-auto p-1 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-indigo-900/5'>
      <div className='col-span-1 sm:col-span-2'>
        <button className='py-1 px-2 bg-indigo-900/20' onClick={() => router.back()}>Back</button>
      </div>
      <div className='justify-self-center'>
        <img src={country.flags.png} alt="flag" />
      </div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-8'>
        <h1 className='w-full col-span-1 sm:col-span-2 text-xl font-bold'>{country.name.common}</h1>
        <div>
          <p><b>Official Name: </b>{country.name.official}</p>
          <p><b>Population: </b>{country.population.toLocaleString()}</p>
          <p><b>Capital: </b>{country.capital}</p>
          <p><b>Region: </b>{country.region}</p>
          <p><b>Subregion: </b>{country.subregion}</p>
        </div>
        <div>
          <p><b>Languages: </b>{formatter.format(arrayFromObjValues(country.languages))}</p>
          <p><b>Currencies: </b>{formatter.format(arrayFromObjKeys(country.currencies))}</p>
        </div>
        <div className='col-span-1 sm:col-span-2 w-full'>
          <p><b>Borders:</b> </p>{country.borders.map(borderCountry => <button className='mr-4 mt-4 py-1 px-2 bg-indigo-900/20' onClick={() => router.push(borderCountry)} key={borderCountry}>{borderCountry}</button> )}
        </div>
      </div>
    </div>
  )
}
export default Country

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { cca3 } = context.query

  const getOne = `https://restcountries.com/v3.1/alpha/${cca3}`;

  try {

    const response  = await fetch(getOne);
    const country = await response.json();

    return {
      props: {
        country: country[0] // promise returns an array
      }
    }
    
  } catch (error) {
    console.log(error)
  }
}