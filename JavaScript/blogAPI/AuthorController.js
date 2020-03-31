const AuthorDB = require('./AuthorDB');
const Author = require('./Author')


class AuthorController {

    async index(req, res) {
        res.send(await AuthorDB.all())
    }

    async show(req, res) {
        let id = req.params.id;
        let author = await AuthorDB.find(id);

        if (!author) {
            res.send("Could not find toy with id of " + id);
        } else {
            res.send(author);
        }
    }

    async create(req, res) {
        console.log("About to create author");
        console.log(req.body);

        let newAuthor = req.body;

        // Quick and dirty validation
        if (Author.isValid(newAuthor, await AuthorDB.all())) {
            // The 'data' contains the id (primary key) of newly created author
            AuthorDB.create(newAuthor).then(data => res.send(data));
        } else {
            // Send a 422 response.
            res.status(422);
            res.send({ message: newAuthor.errors.join(": ") });
        }
    }

    async update(req, res) {
        let newAuthor = req.body;
        console.log("Proposed update: ");
        console.log(newAuthor);
        let id = req.params.id;
        let author = await AuthorDB.find(id);

        if (!author) {
            res.status(404);
            res.send("Could not find toy with id of " + id);
        } else {
            if (Author.isValid(newAuthor, await AuthorDB.all())) {
                // Indicate that the response is successful, but has no body.
                AuthorDB.update(newAuthor).then(() => {
                    res.status(204);
                    res.send();
                });
            } else {
                // Send a 422 response.
                res.status(422);
                res.send({ message: newAuthor.errors.join(": ") });
            }
        }
    }

    async delete(req, res) {
        let id = req.params.id;
        let author = await AuthorDB.find(id);
        if (!author) {
            res.status(404);
            res.send("Could not find toy with id of " + id);
        } else {
            AuthorDB.delete(author).then(() => {
                res.status(204);
                res.send();
            }).catch((message) => {
                res.status(500);
                res.send("Server error: " + message);
            });
        }
    } // end delete
}
module.exports = AuthorController;