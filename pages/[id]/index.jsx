import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAmount, getRecipe } from "../../redux/recipes/recipes.slice";
import { useRouter } from "next/router";
import Comments from "../../components/Comments";
import Likes from "../../components/Likes";
import Layout from "../../components/Layout";
const RecipePage = ({ recipefetch }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipe(recipefetch));
    }, []);

    const { recipe, amount } = useSelector(({ recipes }) => recipes);

    const handleIncrease = () => {
        dispatch(getAmount(amount + 1));
    };
    const handleDecrease = () => {
        dispatch(getAmount(amount - 1));
    };

    useEffect(() => {
        dispatch(getAmount(recipefetch.amount));
        localStorage.setItem("recipes", JSON.stringify(recipefetch));
    }, []);

    const calculare = (currentAmount) => {
        const initialAmount = recipefetch.amount;
        const newAmount = (amount * currentAmount) / initialAmount;
        return newAmount.toFixed(2);
    };

    return (
        <Layout>
            <div className="flex flex-col items-center  min-h-screen  py-8">
                <div className="container">
                    <button
                        className="bg-gray-500 text-white rounded hover:bg-gray-400 p-2"
                        onClick={() => router.back()}
                    >
                        Volver
                    </button>
                    <div className="w-full">
                        <div>
                            <h1 className="text-4xl text-gray-800">
                                {recipefetch.title}
                            </h1>
                            <div className="flex gap-4 items-center py-4">
                                <button
                                    className="bg-indigo-100 rounded-full p-1 hover:bg-red-600 hover:text-white h-5 w-5 flex justify-center items-center text-lg"
                                    onClick={handleIncrease}
                                >
                                    +
                                </button>
                                <p className="text-xl">Cantidad: {amount}</p>
                                <button
                                    className="bg-indigo-100 rounded-full p-1 hover:bg-indigo-600 hover:text-white h-5 w-5 flex justify-center items-center text-lg"
                                    onClick={handleDecrease}
                                >
                                    +
                                </button>
                            </div>
                            <section className="bg-white rounded flex flex-col shadow p-4">
                                {recipefetch.recipes.map((recipe, index) => (
                                    <div
                                        className="text-gray-800 text-lg"
                                        key={index}
                                    >
                                        <span>{recipe.recipe}</span>
                                        <span>
                                            {" "}
                                            <span className="font-bold">
                                                {calculare(recipe.amount)}
                                            </span>
                                        </span>
                                    </div>
                                ))}
                            </section>
                            <Likes />
                            <Comments />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RecipePage;

export async function getServerSideProps(context) {
    const response = await fetch(
        `${process.env.API_RUL}/recipes/${context.query.id}`
    );
    const recipefetch = await response.json();
    return {
        props: { recipefetch }, // will be passed to the page component as props
    };
}
