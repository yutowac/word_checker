import { useState, useEffect } from 'react';

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const resetTrascript = () => {
    setTranscript('');
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Your browser does not support Speech Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ja-JP'; // 日本語に設定

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prevTranscript) => prevTranscript + transcript + ' ');
        }
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setError('Speech recognition error: ' + event.error);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  return {
    transcript,
    isListening,
    error,
    startListening: () => setIsListening(true),
    stopListening: () => setIsListening(false),
    setTranscript,
    resetTrascript
  };
};