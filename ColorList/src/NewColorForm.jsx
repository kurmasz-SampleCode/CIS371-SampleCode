import React, { useState } from "react";
// import { useInput } from "./hooks";

export default function AddColorForm({ onNewColor = f => f }) {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#000000");

    const submit = e => {
        e.preventDefault();
        console.log("Submit!")
        console.log(title)
        console.log(color)
        onNewColor(title, color);
        setTitle("");
        setColor("#000000");
    };

    // See the "Creating Custom Hooks" section in Porcello and Banks
    // for a short-cut to the cut-and-paste for value and onChange.
    return (
        <form onSubmit={submit}>
            <input
                value={title}
                onChange={event => setTitle(event.target.value)}
                type="text"
                placeholder="color title..."
                required
            />
            <input
                value={color}
                onChange={event => { setColor(event.target.value) }}
                type="color"
                required
            />
            <button>ADD</button>
        </form>
    )
}