exports.counterArrayOfObjects = (inputs) => {
    let counter = 0;
    for (let input of inputs) {
        counter += 1;
    }

    return counter;
}