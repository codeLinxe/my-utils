export function orderBy(list, key) {
    return list.sort((a, b) => a[key] - b[key]);
}
  
export function deepTree(list) {
    const newList = [];
    const map = {};

    list.forEach((e) => (map[e.id] = e));

    list.forEach((e) => {
        const parent = map[e.parentId];

        if (parent) {
        (parent.children || (parent.children = [])).push(e);
        } else {
        newList.push(e);
        }
    });

    const fn = (list) => {
        list.map((e) => {
        if (e.children instanceof Array) {
            e.children = orderBy(e.children, 'orderNum');

            fn(e.children);
        }
        });
    };

    fn(newList);

    return orderBy(newList, 'orderNum');
}

export function revDeepTree(list = []) {
    const d = [];
    let id = 0;

    const deep = (list, parentId) => {
        list.forEach((e) => {
        if (!e.id) {
            e.id = id++;
        }

        e.parentId = parentId;

        d.push(e);

        if (e.children && isArray(e.children)) {
            deep(e.children, e.id);
        }
        });
    };

    deep(list || [], null);

    return d;
}