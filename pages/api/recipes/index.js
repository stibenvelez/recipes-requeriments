import recipes from '../../../data/recipes.json'

export default function handler(req, res) {
    res.status(200).json(recipes);
}
