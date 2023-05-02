import axios from 'axios';
import styles from './LocalsCards.module.css';
import { useState } from 'react';

export default function LocalsCards ({ local }) {
  const [documenLink, setDocumenLink] = useState();
  const handleDocument = async () => {
    const { data } = await axios.get(`/locals/document/${local.id}`);
    setDocumenLink(data.url);
  };
  return (
    <>
      <div className={styles.localCardContainer}>
        <h1>{local?.name}</h1>
        <h2>{local?.User?.name}</h2>
        <button onClick={handleDocument} >Document</button>
        {documenLink && <a href={documenLink} target='_blank' rel="noreferrer" >Link al documento</a>}
      </div>
    </>
  );
}
