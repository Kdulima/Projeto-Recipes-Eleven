import React, { useState } from 'react';
import shareIcon from '../../../images/share_Icon.png';
import './style/ShareBtn.css';

export default function ShareBtn() {
  const [showShareMessage, setShowShareMessage] = useState(false);

  // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
  async function copyPageUrl() {
    // Na primeira vez que roda, tende a dar erro.
    if (navigator.clipboard) {
      const { URL } = document;
      const treatedURL = URL.replace('/in-progress', '');
      await navigator.clipboard.writeText(treatedURL);
      setShowShareMessage(true);
    }
  }

  return (
    <>
      <button
        className="share-icon"
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
