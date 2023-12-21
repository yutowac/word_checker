import React, { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSpeechRecognition } from './useSpeechRecognition'
import { useAudioPlayer } from './useAudioPlayer'

function App() {
  const [count, setCount] = useState(0)
  const [ngWord, setNgWord]= useState<string>('じゃないですか')
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const { transcript, isListening, startListening, stopListening, setTranscript } = useSpeechRecognition();
  const swtichListening = () => {
    !isListening ? startListening() : stopListening();
  }
  const reseter = useCallback(() => {
    setTranscript('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { audioRef, play } = useAudioPlayer('./se_30102.wav');
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNgWord(e.target.value);
  }

  useEffect(() => {
    if (transcript.length > 0){
      setTranscripts(transcripts => {
        const newTranscripts = [...transcripts, transcript];
        return newTranscripts.length > 5
        ? newTranscripts.slice(-5)
        : newTranscripts;
      })
      if (transcript.includes(ngWord)) {
        setCount(current => current + 1);
        play();
      }
      reseter();
    }
    console.log(transcripts)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, reseter, transcripts])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>
        <input className='title' onChange={onChange} value={ngWord} />
        を止める
      </h1>
      <div className="card">
        <audio ref={audioRef} />
        <button onClick={swtichListening}>
          {!isListening ? 'start' : 'stop'}
        </button>
        <ul>
          {transcripts.map((elem, idx) => (<li key={idx}>{elem}</li>))}
        </ul>
      </div>
      <p className="read-the-docs">
        {count}回言ったな
      </p>
    </>
  )
}

export default App
