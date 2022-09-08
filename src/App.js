import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [to, setTo] = useState('en')
  const [from, setFrom] = useState('en')
  const [option, setOption] = useState([])

  const translate = async () => {
    try {
      const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: input,
          source: from,
          target: to,
          format: "text",
          api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        }),
        headers: { "Content-Type": "application/json" }
      });
      console.log(await res.json());
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    axios.get('https://libretranslate.com/languages').then(res => setOption(res.data))
  }, [])
  console.log(option)
  return (
    <div className="App">

      from:({from})
      <select onChange={(e) => setFrom(e.target.value)}>
        {
          option.map((data) => <option key={data.code} value={data.code}>{data.name}</option>)
        }
      </select>
      to: ({to})
      <select onChange={(e) => setTo(e.target.value)}>
        {
          option.map((data) => <option key={data.code} value={data.code}>{data.name}</option>)
        }
      </select>
      <br />
      <textarea cols="30" rows="6" onInput={(e) => setInput(e.target.value)}>
      </textarea>
      <br />
      <textarea cols="9" rows="6">

      </textarea>

      <button onClick={() => translate()}>translate</button>

    </div>
  );
}

export default App;
