import React, { useState, useEffect } from "react";
import { RC4, enc } from "crypto-js";

import "./App.css";

function App() {
  const [result, updateResult] = useState("");
  const [input, updateInput] = useState("");
  const [password, updatePassword] = useState("PASSWORD");
  const [isEncrypt, updateIsEncrypt] = useState(true);

  useEffect(() => {
    if (isEncrypt) {
      updateResult(encrypt(input, password));
    } else {
      updateResult(decrypt(input, password));
    }
  }, [input, password, isEncrypt]);

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="encrypt"
                checked={isEncrypt}
                onChange={() => updateIsEncrypt(true)}
              />
              Encrypt
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="decrypt"
                checked={!isEncrypt}
                onChange={() => updateIsEncrypt(false)}
              />
              Decrypt
            </label>
          </div>
        </form>
        <input
          type="text"
          value={password}
          onChange={e => updatePassword(e.target.value)}
        />
        <textarea
          rows="10"
          placeholder="plaintext"
          onChange={e => updateInput(e.target.value)}
          value={input}
        />
        <textarea
          rows="10"
          placeholder="ciphertext"
          readOnly
          style={{ cursor: "default" }}
          value={result}
        />
      </header>
    </div>
  );
}

function encrypt(plaintext, password) {
  return RC4.encrypt(enc.Utf16.parse(plaintext), password).toString();
}

function decrypt(ciphertext, password) {
  return RC4.decrypt(ciphertext, password).toString(enc.Utf16);
}

export default App;
