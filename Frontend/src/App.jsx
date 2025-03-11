import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Nav from './Navigation/nav'; // Fixed import
import Signup  from './SignupPage/signup';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav /> 
      <Signup/>
    </>
  );
}

export default App;
