import React, { useState, useEffect, useRef, useCallback } from "react";
import FlashcardList from "./components/FlashcardList";
import debounce from "lodash/debounce"
import "./index.css"

export default function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php?")
    .then(res => res.json())
    .then(data => setCategories(data.trivia_categories))
  }, [])


 const fetchFlashcards = useCallback(
  debounce(() => {
    fetch(`https://opentdb.com/api.php?amount=${amountEl.current.value}&category=${categoryEl.current.value}`)
    .then(res => res.json())
    .then(data => {
      setFlashcards(data.results)
      setLoading(false)
    })
  }, 4500),
  []
 )

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
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
              <button className="generate-button">{loading ? "Loading..." : "Generate"}</button>
      </div>
    </form>
      <FlashcardList flashcards={flashcards} />
    </>

  )
}


