const filterOp = {
    '/religion': { 'name': 'q' },
}

const getFilterOp = (resource, key) => {
    console.log(resource)
    let res = resource.split('?')[0]
    if (filterOp[res]) {
        if (filterOp[res][key])
            return filterOp[res][key]
    }
    return 'eq';
}

export {
    getFilterOp,
}