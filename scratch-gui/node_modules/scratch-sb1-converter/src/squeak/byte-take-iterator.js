/**
 * An iterator that only takes bytes up to a certain position.
 *
 * Take iterators constrain the number of times an inner iterator can return
 * values. Normally it constrains the number of returned values.
 * ByteTakeIterator instead constrains the number of bytes the inner iterator
 * may take from its stream before ByteTakeIterator returns done objects.
 *
 * Primarily used to wrap {@link FieldIterator}.
 */
class ByteTakeIterator {
    /**
     * @param {{stream: ByteStream}} iter - Iterator with `stream` member.
     * @param {number} [maxPosition=Infinity] - Position `stream` may not go
     * beyond when yielding the next value.
     */
    constructor (iter, maxPosition = Infinity) {
        this.iter = iter;
        this.maxPosition = maxPosition;
    }

    /**
     * @returns {ByteTakeIterator} - Returns itself.
     */
    [Symbol.iterator] () {
        return this;
    }

    /**
     * @returns {{value: *, done: boolean}} - Return the next value or indicate
     * the Iterator has reached its end.
     */
    next () {
        if (this.iter.stream.position >= this.maxPosition) {
            return {
                value: null,
                done: true
            };
        }

        return this.iter.next();
    }
}

export {ByteTakeIterator};
