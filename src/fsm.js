class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.currentState = config.initial;
        this.history = [this.currentState];
        this.index = 0;
        this.isRedo = true;
    }

    /**
     * Returns active currentState.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified currentState.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.history.push(this.currentState);
            this.currentState = state;
            this.isRedo = false;
        } else {
            throw new Error();
        }

    }

    /**
     * Changes currentState according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.currentState].transitions[event]) {
            this.currentState = this.config.states[this.currentState].transitions[event];
            this.history.push(this.currentState);
            this.isRedo = false;
        } else {
            throw new Error();
        }
    }

    /**
     * Resets FSM currentState to initial.
     */
    reset() {
        this.currentState = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];

        if (event) {
            for (let state in this.config.states) {
                if (this.config.states[state].transitions.hasOwnProperty(event)) {
                    result.push(state);
                }
            }
        } else {
            return Object.keys(this.config.states);
        }
        return result;
    }

    /**
     * Goes back to previous currentState.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {

        if ((this.history.length - this.index) > 1) {

            this.index++;
            this.currentState = this.history[this.history.length - 1 - this.index];
            this.isRedo = true;
            return true;
        }

        return false;
    }


    /**
     * Goes redo to currentState.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {

        if (this.history.length && this.index > 0 && this.isRedo) {
            this.index--;
            this.currentState = this.history[this.history.length - 1 - this.index];
            return true;
        }
        return false;

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/