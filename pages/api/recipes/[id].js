import recipes from "../../../data/recipes.json";

export default async function handler(req, res) {
    try {
      const { id } = req.query;

        const recipe = recipes.find((recipe) => recipe.id === parseInt(id, 0))
        res.json(recipe);
    } catch (error) {
        res.status(400).json({msg: 'Hubo un error'})
    }

}
