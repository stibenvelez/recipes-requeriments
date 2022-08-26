import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const initialState = {
    comment: "",
    id: "",
    name: "",
};
const Comments = () => {
    const [comment, setComment] = useState(initialState);
    const [comments, setComments] = useState([]);
    const { query } = useRouter();

    const handleChange = ({ target }) => {
        setComment({ ...comment, [target.name]: target.value, id: query.id });
    };

    const handleSubmit = () => {
        setComments([...comments, comment]);
        localStorage.setItem(
            "comments",
            JSON.stringify([...comments, comment])
        );
        setComment(initialState);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const commnetsLS = JSON.parse(localStorage.getItem("comments")) ?? []
            setComments(commnetsLS);
            return
        }
        setComments([]);
    }, []);

    return (
        <section>
            <form>
                <div>
                    <h2 className="text-xl font-bold">Comments</h2>
                    <div className="flex gap-2 flex-col justify-start items-start py-2">
                        {comments &&
                            comments.map((item, index) => (
                                <div
                                    className="bg-white p-2 shadow rounded-xl px-4"
                                    key={index}
                                >
                                    <p className="text-gray-500 text-sm">
                                        {item.name}:{" "}
                                    </p>
                                    <span>{item.comment}</span>
                                </div>
                            ))}
                    </div>
                    <div className="flex flex-col p-4 gap-2 bg-white shadow">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="bg-gray-50 p-2 border-gray-100 border rounded"
                            value={comment.name}
                            onChange={handleChange}
                        ></input>
                        <label>Comentario</label>
                        <textarea
                            className="bg-gray-50 p-2 border-gray-100 border rounded"
                            onChange={handleChange}
                            rows={4}
                            placeholder="Write a comment"
                            name="comment"
                            value={comment.comment}
                        ></textarea>
                        <div>
                            <button
                                className="bg-indigo-600 text-white rounded py-2 px-4 hover.bg-indigo-500"
                                type="button"
                                onClick={handleSubmit}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default Comments;
