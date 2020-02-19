import React, {useEffect, useState} from 'react'
import axios from 'axios'

function App() {
  useEffect(() => {
    axios.get('/api/hello').then(res => setState(res.data)) // testing our Server route
  }, [])

  const [state, setState] = useState(null)

  return <div className="App">{state}</div>
}

export default App
