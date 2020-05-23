interface String {
    capitalizeFirstLetter(this: string): string | undefined;
}

String.prototype.capitalizeFirstLetter = function () {
    if (this && this !== null) {
    return `${this.charAt(0).toUpperCase()}${this.slice(1)}`;
}
};