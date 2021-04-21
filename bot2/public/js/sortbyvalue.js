let sortByValue = (obj) => {
    var sortable = [];
    for (var vehicle in obj) {
        sortable.push([vehicle, obj[vehicle]]);
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });
    let out = {}
    sortable.map(e=>{
        out[e[0]] = e[1]
    })
    return out
}

export default sortByValue