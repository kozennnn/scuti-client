export function generateMatrice(model) {
    let lines = 0;
    let matrix = [[]];
    for(let i = 0; i < model.length; i++) {
        if(model[i] === "\n" || model[i] === "\r") {
            matrix.push([]);
            lines++;
        } else {
            matrix[lines].push(model[i])
        }
    }

    return matrix;
}
