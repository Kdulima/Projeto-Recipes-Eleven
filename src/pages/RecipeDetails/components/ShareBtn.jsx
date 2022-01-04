import React, { useState } from 'react';
import shareIcon from '../../../images/shareIcon.svg';

export default function ShareBtn() {
  const [showShareMessage, setShowShareMessage] = useState(false);

  // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
  async function copyPageUrl() {
    // Na primeira vez que roda, tende a dar erro.
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(document.URL);
      setShowShareMessage(true);
    }
  }

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyPageUrl }
      >
        <img src={ shareIcon } alt="Share Icon" />
      </button>
      {showShareMessage && <span>Link copiado!</span>}
    </>
  );
}
