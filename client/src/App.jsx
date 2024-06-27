import { useState } from "react";
import {login} from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
 
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState ('');

const navigate = useNavigate();

  const handleLogin = async () => {

    if (Username == '' || Password == '') {
      setErrorMessage("Username and password is required");
      setShowMessage(true);
      
    }

    else {
      const response = await login(Username, Password);

      if (response) {
       navigate('/Inventory');     
      }

      else {
        setErrorMessage('Invalid username and password');
              
      }
      setShowMessage(true);
    }

  }

  return(
    <>
    {/*<div className="grid grid-cols-[30%,70%] w-screen h-[500px]">
        <h1 className="rounded-full shadow-lg shadow-black mx-5 text-5xl text-purple-500 bg-yellow-500 text-center">INVENTORY SYSTEM</h1>
        <h1 className="p-5 text-5xl text-red-500 bg-green-500">INVENTORY SYSTEM</h1>
  </div> */}
      <div className="w-screen h-screen bg-blue-100 p-5 flex justify-center items-center">
        <div className="border border-blue-700 bg-white rounded m-5 p-5 w-[400px] h-[300px]">
          <div className="text-4xl text-center text-blue-700">LOGIN</div>

{
  showMessage &&
  (
    <div className="m-2 text-center rounded bg-red-200 text-red-700" >
    {errorMessage}
  </div>
  )
}


        <div className="flex gap-5 m-5">
          <div className="text-2x1 text-blue-700">Username:</div>
          <input value={Username} onChange={(e) => setUsername(e.target.value)} className="rounded border border-gray-400" type="text" />
        </div>

        <div className="flex gap-5 m-5">
          <div className="text-2x1 text-blue-700">Password:</div>
          <input value={Password} onChange={(e) => setPassword(e.target.value)} className="rounded border border-gray-400" type="password" />
        </div>

      <div className="flex justify-end">
        <button onClick={handleLogin} className="bg-blue-700 text-white p-3 rounded hover:bg-blue-500 ">LOGIN</button>
        </div>

      </div>
    </div>

    </>
  )
}


export default App
