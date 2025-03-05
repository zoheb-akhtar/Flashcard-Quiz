import React, { useState, useEffect, useRef, useCallback } from "react";
import FlashcardList from "./components/FlashcardList";
import debounce from "lodash/debounce"
import "./index.css"

export default function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php?")
    .then(res => res.json())
    .then(data => setCategories(data.trivia_categories))
  }, [])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
    .then(res => res.json())
    .then(data => setFlashcards(data.results))
  }, [])

 const fetchFlashcards = useCallback(
  debounce(() => {
    fetch(`https://opentdb.com/api.php?amount=${amountEl.current.value}&category=${categoryEl.current.value}`)
    .then(res => res.json())
    .then(data => setFlashcards(data.results))
  }, 4500),
  []
 )

  function handleSubmit(event) {
    event.preventDefault()
    fetchFlashcards()
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <label htmlFor="category">Category</label>
          <select ref={categoryEl} id="category">
            {categories.map((category) => {
              return <option value={category.id}>{category.name}</option>
            })}
          </select>
          <label htmlFor="amount">Amount</label>
            <input ref={amountEl} type="number" id="amount" min="1" step="1" defaultValue={10} />
            <div className="button-container">
              <button className="generate-button">Generate</button>
              <p className="note">Note: Loading takes up to 10 seconds...</p>
            </div>
          
      </div>
    </form>
      <FlashcardList flashcards={flashcards} />
    </>

  )
}


