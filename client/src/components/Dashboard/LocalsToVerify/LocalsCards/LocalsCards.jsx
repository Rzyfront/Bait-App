import styles from './LocalsCards.module.css';

export default function LocalsCards ({ local, handleDocument }) {
  return (
    <>
      <div className={styles.localCardContainer}>
        <h1>{local?.name}</h1>
        <h2>{local?.User?.name}</h2>
        {/* <a href={`${axios.defaults.baseURL}/locals/document/${local?.id}`} >Document</a> */}
      </div>
    </>
  );
}
