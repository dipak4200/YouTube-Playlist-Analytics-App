'use client';

import { useState } from 'react';

const InputForm = ({ onSubmit }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(url);
    };

    return (
        <form onSubmit={handleSubmit} className="input-form">
            <input
                type="url"
                placeholder="Enter YouTube Playlist URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="input-field"
            />
            <button type="submit" className="submit-button">Fetch Data</button>
            <style jsx>{`
        .input-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px;
        }
        .input-field {
          padding: 10px;
          font-size: 16px;
        }
        .submit-button {
          padding: 10px;
          font-size: 16px;
          background-color: #ff0000;
          color: #fff;
          border: none;
          cursor: pointer;
        }
      `}</style>
        </form>
    );
};

export default InputForm;
