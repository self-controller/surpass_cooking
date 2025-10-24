from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

RECIPES = [
    {
        'id': 1,
        'title': 'Chicken Fried Rice',
        'ingredients': ['chicken', 'rice', 'soy sauce', 'egg'],
        'instructions': '1. Cook rice. 2. Fry chicken. 3. Mix together with soy sauce and egg.',
        'missing_ingredients': []
    },
    {
        'id': 2,
        'title': 'Garlic Chicken',
        'ingredients': ['chicken', 'garlic', 'olive oil'],
        'instructions': '1. Mince garlic. 2. Cook chicken in olive oil with garlic.',
        'missing_ingredients': []
    },
    {
        'id': 3,
        'title': 'Pasta Carbonara',
        'ingredients': ['pasta', 'egg', 'bacon', 'cheese'],
        'instructions': '1. Boil pasta. 2. Fry bacon. 3. Mix with egg and cheese.',
        'missing_ingredients': []
    }
]


@app.route('/api/test')
def test():
    return jsonify({'message': 'Backend connected!'})

@app.route('/api/recipes', methods=['POST'])
def get_recipes():
    data = request.json
    user_ingredients = [ing.lower() for ing in data.get('ingredients', [])]

    #Get matching recipes
    matching_recipes = []
    for recipe in RECIPES:
        recipe_ingredients = [ing.lower() for ing in recipe.get('ingredients', [])]

        matches = sum([1 for ing in recipe_ingredients if ing in user_ingredients])
        if matches > 0:
            missing_ingredients = [ing for ing in recipe_ingredients 
                                   if ing not in user_ingredients]
            recipe_copy = recipe.copy()
            recipe_copy['missing_ingredients'] = missing_ingredients
            recipe_copy['match_count'] = matches
            matching_recipes.append(recipe_copy)
    
    #Soft recipes by match count
    matching_recipes.sort(key=lambda x: x['match_count'], reverse=True)
    
    return jsonify({'recipes': matching_recipes})

if __name__ == '__main__':
    app.run(debug=True, port=5000)


