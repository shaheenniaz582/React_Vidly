import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    // slice method will slice array items from above calculated startIndex
    // take method picks array for current page from the array which we created with slice
    // to make code more fluent and c all tghe methods in chain converting items array in loadash wrapper
    // value method is used to change into regular array
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
}