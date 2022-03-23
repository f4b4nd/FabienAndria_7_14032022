import recipes from "../../data/recipes.js"
import { searchBarEngine } from "./searchbarEngine.js"
import { tagsEngine } from "./tagsEngine.js"
import { displayRecipes } from "../index.js"

export class SearchEngine {

    constructor () {
        this.results = recipes
        this.tags = {}
        this.searchTerm = ''
    }

    setResultsFromSearchTerm () {
        this.results = searchBarEngine(this.results, this.searchTerm)
        displayRecipes(this.results)
    }

    setResultsFromTags () {
        this.results = tagsEngine(this.results, this.tags)
        displayRecipes(this.results)
    }

    addCharacterToSearchTerm (char) {
        this.searchTerm += char
    }

    removeLastCharacterToSearchTerm () {
        this.searchTerm = this.searchTerm.slice(0, -1)
        this.results = recipes
        displayRecipes(this.results)
    }

    addTag (tag) {
        // tags grouped by origin
        this.tags = {
            ...this.tags,
            [tag.origin] : [
                ...this.tags[tag.origin] || [],
                tag.tagValue
            ]
        }
        this.setResultsFromTags()
    }

    removeTag(tag) {
        this.tags[tag.origin] = this.tags[tag.origin].filter(value => value != tag.tagValue)
        this.results = recipes
        this.setResultsFromTags()
    }

    resetSearch () {
        this.results = recipes
        this.tags = {}
        displayRecipes([])
    }

}