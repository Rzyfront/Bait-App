// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocalsCards from './LocalsCards/LocalsCards';
import { useEffect } from 'react';
import { getLocalsToVerify } from '../../../redux/actions/LocalsAdmin';
import axios from 'axios';

export default function LocalsToVerify () {
  const dispatch = useDispatch();
  const locals = useSelector((state) => state.localsToVerify);

  useEffect(() => {
    dispatch(getLocalsToVerify());
  }, []);

  const handleDocument = async (e) => {
    const localId = e.target.value;
    await axios.get(`/locals/document/${localId}`);
  };
  return (
    <>
      <div>
        <header>
          <h1>Locales a verficar</h1>
        </header>
        <div>
          {locals &&
            locals.map((local, i) => <LocalsCards key={i} local={local} handleDocument={handleDocument}/>)}
        </div>
      </div>
    </>
  );
}
