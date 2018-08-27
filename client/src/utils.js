export const values = arr => Object.keys(arr).map(key => arr[key]);

export const times = n => new Array(Math.max(n, 0)).fill();