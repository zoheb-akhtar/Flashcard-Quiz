import React, { useState, useEffect } from 'react'

export default function Flashcard(props) {
  const [flip, setFlip] = useState(false)
  const [options, setOptions] = useState([])

  useEffect(() => {
    const options = [...props.flashcard.incorrect_answers, props.flashcard.correct_answer]
    const shuffledOptions = options.sort(() => Math.random() - 0.5)
    setOptions(shuffledOptions)
  }, [props.flashcard])

  function flipCard() {
    setFlip(prevFlip => !prevFlip)
  }

  function decodeStr(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return (
    <>
    <div onClick={flipCard} className="flashcard">
      {flip ? (
        <p className="flashcard-answer">{decodeStr(props.flashcard.correct_answer)}</p>
      ) : (
        <div className="inner-flashcard-container">
          <p className="flashcard-question">{decodeStr(props.flashcard.question)}</p>
          <div className="flashcard-options">
            {options.map((randomOption) => {
              return <p>{decodeStr(randomOption)}</p>
            })}
           
          </div>
        </div>
      )}
    </div>
</>
  )
}
