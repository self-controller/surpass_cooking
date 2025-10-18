import { useEffect, useState } from 'react'

function App() {
  // Initialize state for ingredients and input field
  const [ingredients, setIngredients] = useState([])
  const [input, setInput] = useState('')
  // Function to add ingredient to the ingredients list 
  const addIngredient = () => {
    if (ingredients.includes(input.trim().toLowerCase())) {
      return
    }
    else if (input.trim()) {
      setIngredients([...ingredients, input.trim().toLowerCase()])
      setInput('')
    }
  }
  // Function to remove ingredient from ingredients list
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_,i)=> i !== index))
  } 

  return (
    <div style={{padding: '20px'}}>
      <h1>Cooking App</h1>
      <div>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
          placeholder="Enter ingredient..."
          />
      </div>
      <button onClick={addIngredient}>Add Ingredient</button>
      <ul>
        {ingredients.map((ing, index) => (
          <li key={index}>
            {ing}
            <button onClick={() => removeIngredient(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default App
