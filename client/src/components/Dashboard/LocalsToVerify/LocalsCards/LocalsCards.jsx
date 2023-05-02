import axios from 'axios';
import styles from './LocalsCards.module.css';
import { useState } from 'react';

export default function LocalsCards ({ local }) {
  const [documentLink, setDocumentLink] = useState();
  const handleDocument = async () => {
    const { data } = await axios.get(`/locals/document/${local.id}`);
    setDocumentLink(data.url);
  };
  return (
    <>
      <div className={styles.localCardContainer}>
        <h1>{local?.name}</h1>
        <h2>{local?.User?.name}</h2>
        <button onClick={handleDocument} >Document</button>
        {documentLink && <a href={documentLink} target='_blank' rel="noreferrer" >Link al documento</a>}
        <button>Verificar</button>
        <button>Denegar</button>
      </div>
    </>
  );
}
