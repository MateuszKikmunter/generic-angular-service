interface String {
    capitalizeFirst(this: string): string | undefined;
}

String.prototype.capitalizeFirst = function () {
    if (this && this !== null) {
    return `${this.charAt(0).toUpperCase()}${this.slice(1)}`;
}
};