import recipes from "../../data/recipes.js"
import { searchBarInputEngine } from "./searchbarEngine.js"
import { tagsEngine } from "./tagsEngine.js"
import { displayRecipes } from "../index.js"

export class SearchEngine {

    constructor () {
        this.results = recipes
        this.tags = []
    }

    setResultsFromSearchBar (searchTerm) {
        this.results = searchBarInputEngine(this.results, searchTerm)
        displayRecipes(this.results)
    }

    setResultsFromTags () {
        this.results = tagsEngine(this.results)
    }

    addTag(tag) {
        this.tags.push(tag)
    }
}