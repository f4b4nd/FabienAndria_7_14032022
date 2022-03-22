import recipes from "../../data/recipes.js"
import { searchBarInputEngine } from "./searchbarEngine.js"
import { tagsEngine } from "./tagsEngine.js"
import { displayRecipes } from "../index.js"

export class SearchEngine {

    constructor () {
        this.results = recipes
        this.tags = {}
    }

    setResultsFromSearchBar (searchTerm) {
        this.results = searchBarInputEngine(this.results, searchTerm)
        displayRecipes(this.results)
    }

    setResultsFromTags () {
        this.results = tagsEngine(this.results, this.tags)
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
        this.setResultsFromTags()
    }

    resetSearch () {
        this.results = recipes
        this.tags = {}
    }

}