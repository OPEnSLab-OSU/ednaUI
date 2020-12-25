export function titleCase(str: string) {
    return str
        .toLowerCase()
        .split(" ")
        .filter(word => word)
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(" ");
}
