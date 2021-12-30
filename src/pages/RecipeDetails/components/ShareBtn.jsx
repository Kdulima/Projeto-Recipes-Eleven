import React, { useState } from 'react';
import shareIcon from '../../../images/shareIcon.svg';

export default function ShareBtn() {
  const [showShareMessage, setShowShareMessage] = useState(false);

  function copyToClipboard() {
    // Créditos para escrever no clipboard -> https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(global.location.href);
    setShowShareMessage(true);
  }

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyToClipboard }
      >
        <img src={ shareIcon } alt="Share Icon" />
      </button>
      {showShareMessage && 'Link copiado!'}
    </>
  );
}
