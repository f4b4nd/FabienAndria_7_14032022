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

    setResults () {
        if (!SearchEngine.objectIsEmpty(this.tags) && this.searchTerm !== '') {
            this.setResultsFromTags()
            this.setResultsFromSearchTerm()
        }
        else if (!SearchEngine.objectIsEmpty(this.tags) && this.searchTerm === '') {
            this.setResultsFromTags()
        }
        else if (SearchEngine.objectIsEmpty(this.tags) && this.searchTerm !== '') {
            this.setResultsFromSearchTerm()
        }
        else {
            return
        }
        displayRecipes(this.results)
    }

    setResultsFromSearchTerm () {
        this.results = searchBarEngine(this.results, this.searchTerm)
    }

    setResultsFromTags () {
        this.results = tagsEngine(this.results, this.tags)
    }

    addCharacterToSearchTerm (char) {
        this.searchTerm += char
    }

    removeLastCharacterToSearchTerm () {
        this.searchTerm = this.searchTerm.slice(0, -1)
        this.results = recipes
        if (this.searchTerm.length >= 3) {
            displayRecipes(this.results)
        }
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
        this.setResults()
    }

    removeTag(tag) {
        this.tags[tag.origin] = this.tags[tag.origin].filter(value => value != tag.tagValue)
        this.results = recipes
        this.setResults()
    }

    resetSearch () {
        this.results = recipes
        this.tags = {}
        displayRecipes([])
    }

    static objectIsEmpty (obj) {
        return Object.values(obj).filter(arr => arr.length > 0).length === 0
    }

}