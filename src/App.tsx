import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import styles from './App.module.css'
import Endpoint from './components/endpoint'
import { parsePromptsTemplate, PromptTemplate } from './utils/parse-prompts-templates'
import { Prompts } from './components/prompts'
import { Toaster } from 'sonner'
import { Requester } from './utils/request'
import { SD_APIS } from './constants/apis'
import { AppState } from './states/app'
import Preview from './components/preview'

function App() {

  const [prompts, setPrompts] = useState<PromptTemplate[]>([])

  useEffect(() => {
    parsePromptsTemplate().then((res) => {
      setPrompts(res)
    })
    Requester(SD_APIS.GetOptions).then((res) => {
      AppState.options = res
    })
    Requester(SD_APIS.GetSamplers).then((res) => {
      AppState.samplers = res
    })
    AppState.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      AppState.theme = e.matches ? 'dark' : 'light'
    })
  },[])

  return (
    <div>
      <Toaster
        closeButton
        richColors
        theme={AppState.theme}
      />
      <div className={styles["header"]}>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className={styles["logo"]} alt="React logo" />
        </a>
        <h1>Stable Diffusion Generator</h1>
      </div>
      <Endpoint />
      <Preview />
      <Prompts prompts={prompts} />
    </div>
  )
}

export default App
