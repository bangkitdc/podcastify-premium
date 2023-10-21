import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import InputText from './components/shares/inputs/Text';
import { FormProvider, useForm } from 'react-hook-form';

function App() {
  const [count, setCount] = useState(0)
  const methods = useForm({
    mode: "onChange",
    delayError: 500
  });

  return (
    <>
      <FormProvider {...methods}>
        <form
        // onSubmit={}
        >
          <InputText
            id="name"
            label="Name"
            validation={{
              required: "Name must be filled",
              pattern: {
                value: /^[A-Za-z\d\s]{6,}$/, // This regex enforces a minimum of 6 characters, including letters, digits, and spaces
                message: "Name must be at least 6 characters long",
              },
            }}
            placeholder="Enter your name"
          />
        </form>
      </FormProvider>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App
