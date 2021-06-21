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
        
    })
    .then(( ) => {
        // debugger
        const deleteOldPoem = document.querySelectorAll(".delete-button")
        console.log(deleteOldPoem);
        
        deleteOldPoem.forEach(poem => {
            poem.addEventListener("click", (r) => deletePoem(r))
        })
        // for (let i = 0; i < deleteOldPoem.length; i++) {
        //     deleteOldPoem[i].addEventListener("click", (r) => deletePoem(r))
        // }
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
    debugger
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
        debugger
        document.querySelector('#poem-container').innerHTML += newPoem.renderPoemCard();
    })
}

function deletePoem(r) {
    const id = r.target.dataset.id;
    // debugger
    fetch(`http://localhost:3000/api/poems/${id}`, {
        method: "DELETE",  
    })
    .then(response => response.json())
    .then( data => {
        // console.log('hello');
        const deletedPoemArr = Poem.all.filter(poem => poem.id != data.id)
             
            document.getElementById('poem-container').innerHTML = "";
            deletedPoemArr.forEach(filteredPoem => {
            document.getElementById('poem-container').innerHTML += filteredPoem.renderPoemCard();
            })
    })
}