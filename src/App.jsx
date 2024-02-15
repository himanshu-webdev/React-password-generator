import React, { useState, useRef, useEffect } from 'react';
import { FaCopy } from "react-icons/fa";
import { Toaster, toast } from 'sonner';

function App() {
  const [length, setLength] = useState(8);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Function to generate password
  const passwordGenerator = () => {
    setErrors({}); // Reset errors
    if (!upperCase && !lowerCase && !numbers && !symbols) {
      return setErrors("Please select at least one character type.");
    } else if (length === "0") {
      return setErrors("Password length cannot be 0.");
    } else if (length === "") {
      return setErrors("Invalid password length.");
    } else if (length >= 30) {
      setPassword("");
      return setErrors("Password length cannot exceed 30 characters.");
    }

    // Initialize password string
    let pass = "";

    // Generate password based on selected criteria
    for (let i = 0; i < length; i++) {
      let choice = random(0, 3);
      if (lowerCase && choice === 0) {
        pass += randomLower();
      } else if (upperCase && choice === 1) {
        pass += randomUpper();
      } else if (symbols && choice === 2) {
        pass += randomSymbol();
      } else if (numbers && choice === 3) {
        pass += random(0, 9);
      } else {
        i--; // If none of the character types are selected, decrement i to stay in the loop and try again.
      }
    }
    setPassword(pass); // Update password state with generated password
  };

  // Function to generate random number within a range
  const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  // Function to generate random lowercase letter
  const randomLower = () => {
    return String.fromCharCode(random(97, 122));
  };

  // Function to generate random uppercase letter
  const randomUpper = () => {
    return String.fromCharCode(random(65, 90));
  };

  // Function to generate random symbol
  const randomSymbol = () => {
    const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>";
    return symbols[random(0, symbols.length - 1)];
  };

  // Reference for the password input field
  const passwordRef = useRef(null);

  // Function to copy password to clipboard
  const copyToClipboard = () => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 8); // select only from 0 to 8 position of password length
    window.navigator.clipboard.writeText(password);
  };

  useEffect(()=> {
    passwordGenerator();
  },[])

  return (
    <div className='bg-violet-800/80 w-full h-screen px-4 flex items-center'>
      <div className='flex flex-col h-[450px] max-w-md shadow-xl rounded-xl bg-slate-800/70 mx-auto py-4'>  
        <h1 className='text-3xl text-white text-center px-2 py-1 font-semibold'>Password Generator</h1>

        {/* Password input field */}
        <div className='w-3/4 flex justify-center mx-[52px] my-4'>
          <input type="text" value={password}
            className='outline-none w-full py-1 px-3 flex flex-col flex-wrap rounded-lg bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
            placeholder='password' readOnly ref={passwordRef} />

            <div>
              <Toaster richColors position="top-right" />
              <FaCopy onClick={()=>{
                copyToClipboard();
                toast.success('Copied');
              }} size={40} className='text-blue-600/90 ml-2 cursor-pointer' />
            </div>
        </div>

        {/* Password length slider */}
        <div className='flex flex-col text-sm gap-x-1'>
          <div className='flex flex-col justify-center items-center gap-x-1'>
            <label className='text-xl pr-2 mb-7 text-white'>Password Length: {length}</label>
            <input type="range" min={6} max={12} value={length} className='w-[250px] cursor-pointer mb-4' onChange={(e) => { setLength(e.target.value) }} />
          </div>
        </div>

        {/* Checkbox options for character types */}
        <div className='flex justify-start items-center gap-x-1 mx-[52px] py-1'>
          <input type="checkbox" defaultChecked={upperCase} className='w-6 h-5'
            id="upperCase" onChange={() => {
              setUpperCase((prev) => !prev);
            }} />
          <label className='font-normal px-2 text-lg text-white' htmlFor="upperCase">Upper Case</label>
        </div>  

        <div className='flex justify-start items-center gap-x-1 mx-[52px] py-1'>
          <input type="checkbox" defaultChecked={lowerCase} className='w-6 h-5'
            id="lowerCase" onChange={() => {
              setLowerCase((prev) => !prev);
            }} />
          <label className='font-normal px-2 text-lg text-white' htmlFor="lowerCase">Lower Case</label>
        </div>

        <div className='flex justify-start items-center gap-x-1 mx-[52px] py-1'>
          <input type="checkbox" defaultChecked={numbers} className='w-6 h-5'
            id="numberInput" onChange={() => {
              setNumbers((prev) => !prev);
            }} />
          <label className='font-normal px-2 text-lg text-white' htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex justify-start items-center gap-x-1 mx-[52px] py-1'>
          <input type="checkbox" defaultChecked={symbols} className='w-6 h-5'
            id="characterInput" onChange={() => {
              setSymbols((prev) => !prev);
            }} />
          <label className='font-normal px-2 text-lg text-white' htmlFor="characterInput">Characters</label>
        </div>

        {/* Button to generate password */}
        <button type='submit' onClick={passwordGenerator} className="bg-[#BC15F4] flex mx-12 my-3 justify-center text-center cursor-pointer hover:bg-blue-700 font-bold py-3 px-4 rounded-lg w-3/4 text-white ">Generate Password</button>
      </div>
    </div>
  ) 
}

export default App;
