// @ts-nocheck

import { useState, useEffect } from 'react';
import TagCloud from 'react-tag-cloud';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import logoImage from '../../assets/logo.svg';
import { VscArrowLeft } from 'react-icons/vsc';

import axios from 'axios';

export function TagsCloud() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/words/cloud').then(response => {
      setWords(response.data.words)
    });
  }, []);

  return (
    <main className={styles.cloudWrapper} >
      <div className={styles.header}>
        <img src={logoImage} alt='Logo DOWhile 2021' />
        <h1>Nuvem de palavras</h1>
      </div>
      <div className={styles.cloud}>
        <Link className={styles.backButton} to="/">
          <VscArrowLeft size='32' />
        </Link>
        <TagCloud 
          style={{
            fontFamily: 'sans-serif',
            fontSize: 30,
            fontWeight: 'bold',
            padding: 18,
            width: '100%',
            height: '100%'
          }}>
            {
              Object.keys(words).map(word => (
                <div key={word} style={{fontSize: words[word] * 18}}>{word}</div>
              ))
            }
        </TagCloud>
      </div>
    </main>
  )
}