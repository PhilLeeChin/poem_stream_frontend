class Poem {
    constructor(poem, poemAttributes) {
        this.id = poem.id
        this.title = poemAttributes.title
        this.lines = poemAttributes.lines
        this.genre = poemAttributes.genre
        Poem.all.push(this)
    }

    renderPoemCard() {
        return `
            <div data-id=${this.id}>
                <h3>Poem Title: ${this.title}</h3>
                <p>Poem Genre: ${this.genre.name}</p>
                <p>${this.lines}</p>
                <button data-id=${this.id} type="button" class="delete-button">Delete</button> 
            </div><br>`;
    }
}

Poem.all = [];