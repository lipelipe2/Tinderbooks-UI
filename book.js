class Book {
    constructor (bookId, nome, description, thumbnail = "", liked = false){
        this.bookId = bookId;
        this.nome = nome;
        this.description = description;
        this.thumbnail = thumbnail;
        this.developer = "Filipe Marques";
        this.liked = liked;
    }
}