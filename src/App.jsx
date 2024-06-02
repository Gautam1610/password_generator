import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => passwordGen(), [length, numAllowed, charAllowed, passwordGen]);

  const copyPassonClickBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <div className="bg-purple-500 shadow-md rounded-lg p-4 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Password Generator</h2>
        <div className="flex flex-wrap mb-4 justify-center">
          <input
            type="text"
            value={password}
            className="w-full p-2 pl-10 text-sm font-semibold bg-black text-white"
            placeholder="Generated Password"
            ref={passwordRef}
            readOnly
          />
          <button
            className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
            onClick={copyPassonClickBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-wrap mb-4 justify-center">
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <label className="block mb-2 text-sm font-bold">Length</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-full"
              onChange={(e) => setLength(e.target.value)}
            />
            <span className="text-sm">{length}</span>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <label className="block mb-2 text-sm font-bold">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                onChange={() => setNumAllowed((prev) =>!prev)}
              />
              Numbers
            </label>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <label className="block mb-2 text-sm font-bold">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => setCharAllowed((prev) =>!prev)}
              />
              Special Characters
            </label>
          </div>
        </div>
        <button
          className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded w-full"
          onClick={passwordGen}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;