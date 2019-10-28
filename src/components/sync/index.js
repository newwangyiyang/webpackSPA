import lodash from 'lodash-es'
import css from './sync.css'
import(/* webpackChunkName: "async-test" */ '../async').then(({default: _}) => {
    _.init()
})
export const sync = () => {
    console.log('sync')
    fetch('api/test')
    .then(res => res.json())
    .then(data => console.log(data))
}

export const IIsArray = (arr) => {
    return lodash.isArray(arr)
}
