import React, { useState, useEffect } from 'react';
import Typist from 'react-typist';
import shuffle from '../../utils/shuffle';
import statementsList from '../../utils/statementsList';

const Typer = () => {
  const [statements] = useState(() => shuffle(statementsList));
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [count]);

  return (
    <div>
      {count ? (
        <Typist avgTypingDelay={40} startDelay={2000}>
          {statements.map((elem, i) => (
            <span key={i}>
              {elem}
              <Typist.Backspace count={elem.length} delay={5000} />
            </span>
          ))}
          <Typist.Backspace count={20} delay={5000} />
        </Typist>
      ) : (
        'Descriptor'
      )}
    </div>
  );
};

export default Typer;
