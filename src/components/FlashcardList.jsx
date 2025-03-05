import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList(props) {
  return (
    <div className="container">
      {props.flashcards.map((flashcard, index) => {
        return <Flashcard key={`${index} ${flashcard.question}`} flashcard={flashcard} />
      })}
    </div>
  )
}
