import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({ recipes }) {
    return (
        <Layout>
            <div className="flex flex-col justify-center items-center bg-indigo-100 min-h-screen">
                <div className="p-8 ">
                    <h1 className="text-4xl font-bold">
                        Recipes Requeriments
                    </h1>
                    <p>select a recipe</p>
                </div>
                <div className="flex gap-4 flex-wrap">
                    {recipes.map((recipe) => (
                        <Link key={recipe.id} href={`${recipe.id}`}>
                            <div className="bg-white rounded-md p-8 cursor-pointer hover:shadow-md transition duration-200 ease-in-out">
                                <div>
                                    <h4 className="text-xl font-bold">
                                        {recipe.title}
                                    </h4>
                                    <span className="text-gray-500 font-bold">
                                        {recipe.category}
                                    </span>
                                    <div>
                                        {recipe.recipes
                                            .slice(0, 3)
                                            .map((item, index) => (
                                                <p
                                                    key={index}
                                                    className="text-sm text-gray-400"
                                                >
                                                    {item.recipe}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.API_RUL}/recipes`);
    const recipes = await response.json();
    return {
        props: { recipes }, // will be passed to the page component as props
    };
}
