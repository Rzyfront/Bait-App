// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocalsCards from './LocalsCards/LocalsCards';
import { useEffect } from 'react';
import { getLocalsToVerify } from '../../../redux/actions/LocalsAdmin';

export default function LocalsToVerify () {
  const dispatch = useDispatch();
  const locals = useSelector((state) => state.localsToVerify);

  useEffect(() => {
    dispatch(getLocalsToVerify());
  }, []);

  return (
    <>
      <div>
        <header>
          <h1>Locales a verificar `:emoji_check:`</h1>
        </header>
        <div>
          {locals &&
            locals.map((local, i) => <LocalsCards key={i} local={local} />)}
        </div>
      </div>
    </>
  );
}
