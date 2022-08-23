import { useTheme } from 'next-themes'
import React, { Fragment, useEffect, useState } from 'react'
import { MdDarkMode, MdWbSunny } from 'react-icons/md'

const Header = () => {

  const {theme, setTheme} = useTheme();
  const [ mounted, setMounted ] = useState(false)

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    setMounted(true)
  }, []);

  // to solve Hydration Error
  const renderThemeChanger= () => { 
    if(!mounted) return null;

    if (theme === 'light') {
      return (
        <Fragment>
        <MdDarkMode /> <p>Dark Mode</p>
      </Fragment>
      )
    } else {
      return (
        <Fragment>
        <MdWbSunny /> <p>Light Mode</p>
      </Fragment>
      )
    }
 };

  return (
    <header className='mb-4 shadow-lg'>
        <div className='container mx-auto grid grid-cols-2 py-3 px-1 lg:px-0 '>
            <h4>Where in the world?</h4>
            <button onClick={changeTheme} className='justify-self-end flex gap-2 items-center'>
            {renderThemeChanger()}
            </button>
        </div>
    </header>
  )
}

export default Header