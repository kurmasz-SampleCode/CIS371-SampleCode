"use strict";

/**
 * One way of implementing "flippy triangles".  Note:  This is only partially complete.
 * A "real" implementation would have more styling and a some sort of encapsulation.
 *
 * Notice that this implementation uses the DOM itself to store state, ** AVOID DOING THIS **
 * Created by kurmasz on 2/6/15 (revised October 2022)
 */

export default class HideableList {

    static #drawTriangle(canvas, draw) {
        const height = 10;
        const width = 10;
        canvas.height = height;
        canvas.width = width;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        draw(ctx, width, height);
        ctx.closePath();
        ctx.fill();
    }

    static #closedTriangle(canvas) {
        this.#drawTriangle(canvas, (ctx, width, height) => {
            ctx.lineTo(0, height);
            ctx.lineTo(width, height / 2);
        })
    }

    static #openTriangle(canvas) {
        this.#drawTriangle(canvas, (ctx, width, height) => {
            ctx.moveTo(0, 0);
            ctx.lineTo(width, 0);
            ctx.lineTo(width / 2, height);
        });
    }

    //
    // Notice above how lambdas can be used to avoid duplicated code.
    // (Or, we could have put an if/else inside draw triangle)
    // 


    static #closedTriangle_old(canvas) {
        const height = 10;
        const width = 10;
        canvas.height = height;
        canvas.width = width;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.lineTo(width, height / 2);
        ctx.closePath();
        ctx.fill();
    }

    static #openTriangle_old(canvas) {
        const height = 10;
        const width = 10;
        canvas.height = height;
        canvas.width = width;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.lineTo(width / 2, height);
        ctx.closePath();
        ctx.fill();
    }

    //
    // This is the function that applies the callbacks to make
    // the triangles "active"
    //

    static apply() {
        let hidable = document.getElementsByClassName("hideableList");
        
        // Create an array to store the state of each hidableList
        let visible = Array(hidable.length).fill(true);

        for (let i = 0; i < hidable.length; i++) {
            let item = hidable[i];

            let paragraph = item.getElementsByTagName("p")[0];
            //paragraph.addEventListener("click", makeHandler(item));


            // Notice that the entire "hideableList" object is clickable.
            paragraph.addEventListener("click", (event) => {
                //
                // Toggle the List
                // This time we are using a closure to store state in our code.  Much better!
                //
                let ul = item.getElementsByTagName("ul")[0];
                if (visible[i]) {
                    ul.style.display = "none";
                    visible[i] = false;
                    this.#closedTriangle(item.getElementsByClassName("triangle")[0]);
                } else {
                    ul.style.display = "block";
                    visible[i] = true;
                    this.#openTriangle(item.getElementsByClassName("triangle")[0]);
                }
            });

            this.#openTriangle(item.getElementsByClassName("triangle")[0]);
        };
    }
}

console.log("Loading module");
// Don't apply the event listeners until the document has loaded.
if (document.readyState === "interactive" || document.readyState === "complete") {
    console.log(`readyState is already ${document.readyState}`);
    HideableList.apply();
} else {
    console.log(`Initial readyState: ${document.readyState}`);
    document.addEventListener("readystatechange",  () => {
        console.log(`readyState is now ${document.readyState}`)
        if (document.readyState === "interactive") {
            //applyHideable(); // for hl.js
            HidableList.apply(); // for hl_v2.js
        }
    });
}