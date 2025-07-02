
import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react'
import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'light' | 'dark';

export function Menu( ) {

  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storedTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
    return storedTheme ;
  });

  const nextThemeIcon = {
    light: <MoonIcon />,
    dark: <SunIcon />

  }


  function handleThemeChange( 
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ){
    event.preventDefault();

    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return newTheme;
    }
    );

  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu} >
      
      <RouterLink className={styles.menuLink} href='/' aria-label='Ir para a Home' title='Ir para a Home'>
        <HouseIcon  />                                      
      </RouterLink>
      <RouterLink className={styles.menuLink} href='/history/' aria-label='Ver Histórico' title='Ver Histórico'>
        <HistoryIcon  />                                      
      </RouterLink>
      <RouterLink className={styles.menuLink} href='/settings/' aria-label='Configurações' title='Configurações'>
        <SettingsIcon  />                                      
      </RouterLink>
      <RouterLink 
        className={styles.menuLink} 
        href='#' 
        aria-label='Mudar Tema' 
        title='Mudar Tema' 
        onClick= { handleThemeChange}
      >
        {nextThemeIcon[theme]}                                      
      </RouterLink>
    </nav>
  )
}