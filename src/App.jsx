import { useEffect, useState } from 'react'

function App() {
  // Initialize state for ingredients and input field
  const [ingredients, setIngredients] = useState([])
  const [input, setInput] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

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
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  // Function to fetch recipes from backend based on ingredients
  const fetchRecipes = async () => {
    if (ingredients.length === 0) {
      alert('Please add at least one ingredient')
      return
    }
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      })

      const data = await response.json()
      setRecipes(data.recipes || [])
    } catch (error) {
        alert("Error fetching recipes " + error.message)
    } finally {
        setLoading(false)
    }
  } 



  return (
    <div style={{ padding: '20px' }}>
      <h1>Cooking App</h1>
      <div style={{marginBottom: '20px'}}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
          placeholder="Enter ingredient..."
          style={{padding: '8px', marginRight: '10px', width: '200px'}}
        />
        <button onClick={addIngredient}>
          Add Ingredient
        </button>
      </div>

      <div style={{marginBottom: '20px'}}>
        <h3>Your Ingredients: ({ingredients.length})</h3>
        {ingredients.length === 0 ? (
          <p>No ingredients added yet!</p>
        ) : (
          <ul>
          {ingredients.map((ing, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              {ing}
              <button 
                onClick={() => removeIngredient(index)}
                style={{ marginLeft: '10px', padding: '4px 8px' }}
              >Remove
              </button>
            </li>
          ))}
          </ul>
        )}
        <button 
          onClick={fetchRecipes}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer', 
            fontSize: '16px'
          }}
          >
            {loading ? "Searching... " : 'Find Recipes'}          
        </button>
      </div>
      <div>
        <h2>Recipes {recipes.length}</h2>
        {recipes.length === 0 ? (
          <p>No recipes found :{'('}</p> 
        ) : (
          <div>
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '16px',
                  marginBottom: '16px',
                  borderRadius: '8px'
                }}
              >
                <h3>{recipe.title}</h3>
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
                {recipe.missing_ingredients.length > 0 ? (
                  <p style={{ color: 'orange' }}>
                    Missing: {recipe.missing_ingredients.join(", ")}
                  </p>
                ) : (<p>All ingredients available!</p>)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
