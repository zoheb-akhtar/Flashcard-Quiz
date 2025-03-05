import React, { useState } from 'react'

export default function Flashcard(props) {
  const [flip, setFlip] = useState(false)

  const answer = props.flashcard.correct_answer
  const options = [...props.flashcard.incorrect_answers, answer]
  const randomOptionsArray = options.sort(() => Math.random() - 0.5)

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
            {randomOptionsArray.map((randomOption) => {
              return <p>{decodeStr(randomOption)}</p>
            })}
           
          </div>
        </div>
      )}
    </div>
</>
  )
}
