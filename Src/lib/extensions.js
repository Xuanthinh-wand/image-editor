Number.prototype.round = function (places = 2) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
}