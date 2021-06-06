const poemURL = "http://localhost:3000/api/poems"

document.addEventListener('DOMContentLoaded', () => {
    // console.log("loaded");
    getPoem()

    const writePoemForm = document.querySelector("#write-poem")

    writePoemForm.addEventListener("submit", (e) => createFormHandler(e))
})

function getPoem() {
    fetch(poemURL)
    .then(response => response.json())
    .then(poem => {
        // console.log(poem);
        poem.data.forEach(poem => {
            let newPoem = new Poem(poem, poem.attributes)

            document.querySelector('#poem-container').innerHTML += newPoem.renderPoemCard();
            // render(poem)
        })
        // const deleteEvent = document.querySelectorAll(".delete-button")
        // .forEach((button) => button.addEventListener("click", deletePoem))
    })
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector('#input-title').value
    const linesInput = document.querySelector('#input-lines').value
    // const genresInput = document.querySelector('#genres').value
    const genreId = parseInt(document.querySelector('#genres').value)
    postFetch(titleInput, linesInput, genreId)
    // e.target.reset();
}

function postFetch(title, lines, genre_id) {
    const bodyData = {title, lines, genre_id}

    fetch(poemURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(poem => {
        console.log(poem);
        const poemData = poem.data
        let newPoem = new Poem(poemData, poem.attributes)

        document.querySelector('#poem-container').innerHTML += newPoem.renderPoemCard();
    })
}

// function deletePoem(e) {
//     const id = e.target.dataset.id;
//     fetch(`http://localhost:3000/api/poems/${id}`, {
//         method: "DELETE",   
//     })
//     .then(res => res.json())
//     .then( data => {
//        const deletedPoemArray = Poem.all.filter(poem => poem.id != data.id)
             
//             document.getElementById('#poem-container').innerHTML = "";
//             deletedPoemArray.forEach(filteredPoem => {
//             document.getElementById('#poem-container').innerHTML += filteredPoem.renderPoemCard();
//         })
//     })
// }