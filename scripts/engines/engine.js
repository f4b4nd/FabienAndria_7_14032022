import recipes from "../../data/recipes.js"
import { searchBarEngine } from "./searchbarEngine.js"
import { tagsEngine } from "./tagsEngine.js"
import { displayRecipes, displayNoResultsMessage } from "../index.js"

export class SearchEngine {

    constructor () {
        this.results = recipes
        this.tags = {}
        this.searchTerm = ''
    }

    setResults () {

        if (this.preventSearch()) {
            displayRecipes([])
            return
        }

        if (!this.tagsAreEmpty() && this.searchTerm !== '') {
            this.setResultsFromTags()
            this.setResultsFromSearchTerm()
        }
        else if (!this.tagsAreEmpty() && this.searchTerm === '') {
            this.setResultsFromTags()
        }
        else if (this.tagsAreEmpty() && this.searchTerm !== '') {
            this.setResultsFromSearchTerm()
        }
        else {
            return
        }

        displayRecipes(this.results)
        displayNoResultsMessage(this.results)
    }

    parametersAreEmpty () {
        return this.tagsAreEmpty() && this.searchTerm === ''
    }

    preventSearch () {
        return this.searchTerm.length < 3 && this.tagsAreEmpty()
    }

    tagsAreEmpty () {
        return Object.values(this.tags).filter(arr => arr.length > 0).length === 0
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

    removeLastCharacterFromSearchTerm () {
        this.searchTerm = this.searchTerm.slice(0, -1)

        if (this.parametersAreEmpty()) {
            this.resetSearchEngine()
            return
        }

        this.resetResults()
        this.setResults()
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

        if (this.parametersAreEmpty()) {
            this.resetSearchEngine()
            return
        }

        this.resetResults()
        this.setResults()
    }

    resetSearchEngine () {
        this.resetResults()
        this.searchTerm = ''
        this.tags = {}
        displayRecipes([])
        displayNoResultsMessage([false])
    }

    resetResults () {
        this.results = recipes
    }

}