import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Comments = ({ slug }) => {
    const [user, setUser] = useState(null);
    const [userid, setUserid] = useState("");
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const [editCommentText, setEditCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [allComments, setAllComments] = useState([]);

    // Check user authentication and token validity
    useEffect(() => {
        const token = localStorage.getItem("Token");
        if (token) {
            setUser(token);
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const JWTData = JSON.parse(window.atob(base64));
            setUserid(JWTData.data._id);
            setUsername(JWTData.data.username);
        } else {
            setUser(null);
        }
    }, []);

    // Fetch comments based on the slug
    useEffect(() => {
        if (slug) {
            const fetchComments = async () => {
                try {
                    const response = await axios.get(`/api/comment?slug=${slug}`);
                    setAllComments(response.data);
                } catch (error) {
                    console.error("Error fetching comments:", error);
                }
            };
            fetchComments();
        }
    }, [slug]);

    // Post new comment or update existing comment
    const postComment = async (ev) => {
        ev.preventDefault();

        if (!userid) {
            Swal.fire({
                icon: 'error',
                title: 'Not logged in',
                text: 'Please log in to post a comment.',
            });
            return;
        }

        const url = editingCommentId ? '/api/comment' : '/api/comment';
        const method = editingCommentId ? 'PUT' : 'POST';
        const data = editingCommentId
            ? { editingCommentId, userid, username, comment: editCommentText, slug }
            : { userid, username, comment, slug };

        try {
            await axios({ url, method, data });
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: editingCommentId ? "Comment Updated" : "Comment added"
            });
            setEditingCommentId(null);
            setEditCommentText("");
            setComment("");
            // Fetch updated comments
            const response = await axios.get(`/api/comment?slug=${slug}`);
            setAllComments(response.data);
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Something is wrong"
            });
            console.error(`Error ${editingCommentId ? 'updating' : 'posting'} comment:`, error);
        }
    };

    // Delete comment
    const deleteComment = async (commentId) => {
        try {
            await axios.delete('/api/comment', { data: { commentId } });
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Comment Deleted"
            });
            // Fetch updated comments
            const response = await axios.get(`/api/comment?slug=${slug}`);
            setAllComments(response.data);
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Something is wrong"
            });
            console.error("Error deleting comment:", error);
        }
    };

    // Start editing comment
    const startEditing = (commentId, commentText) => {
        setEditingCommentId(commentId);
        setEditCommentText(commentText);
    };

    return (
        <>
            <div className="flex items-center justify-center mt-2 mb-7 w-full max-w-5xl mx-auto rounded-lg dark:border-black">
                <form onSubmit={postComment} className="w-full bg-white shadow-xl mx-4 md:mx-16 lg:mx-0 mb-4 rounded-lg px-4 pt-2 dark:bg-slate-700">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg lg:text-xl font-bold my-4 dark:text-gray-100">
                            {editingCommentId ? "Edit your comment" : "Add a new comment"}
                        </h2>
                        <div className="w-full md:w-full px-3 mb-2 mt-2">
                            <textarea
                                className="bg-gray-100 rounded !border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white dark:bg-slate-600 dark:text-gray-200 dark:placeholder-gray-400"
                                name="comment"
                                placeholder="Type Your Comment"
                                required
                                value={editingCommentId ? editCommentText : comment}
                                onChange={ev => editingCommentId ? setEditCommentText(ev.target.value) : setComment(ev.target.value)}
                            ></textarea>
                        </div>
                        <div className="w-full md:w-full flex items-start px-3">
                            {user ? (
                                <input
                                    type="submit"
                                    className="disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1 cursor-pointer"
                                    value={editingCommentId ? "Update Comment" : "Post Comment"}
                                />
                            ) : (
                                <p className="text-gray-800 font-bold dark:text-gray-100">
                                    <Link href="/login">Login</Link> to comment...
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <div className="max-w-5xl mx-auto pt-4 pb-8">
                <h3 className="mb-2 mx-4 text-2xl font-semibold dark:text-gray-300">Comments ({allComments.length})</h3>
                <hr className="mb-1" />
                {allComments.map((comment) => (
                    <div key={comment._id} className="max-w-screen-sm px-4 my-3">
                        <div className="flex">
                            <div className="rounded-full flex-shrink-0 mr-2">
                                <img
                                    src="/img/coder.png"
                                    alt=""
                                    style={{ height: "5rem", width: "4rem" }}
                                    className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                />
                            </div>
                            <div className="shadow-xl flex-1 !border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed max-w-[75vw] break-words dark:bg-slate-700 dark:border-black">
                                <strong className="dark:text-gray-200">{comment.username}</strong>
                                <span className="text-xs text-gray-500 ml-2 dark:text-gray-400">{comment.createdAt}</span>
                                <div className="flex">
                                    <p className="text-sm mt-1 dark:text-gray-100">{comment.comment}</p>
                                </div>
                                {user && comment.userid === userid && (
                                    <div className="mt-2 flex space-x-2">
                                        <button
                                            onClick={() => startEditing(comment._id, comment.comment)}
                                            className="text-indigo-500 hover:text-indigo-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteComment(comment._id)}
                                            className="text-red-500 hover:text-red-800 "
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Comments;
