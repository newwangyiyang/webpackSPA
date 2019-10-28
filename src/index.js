import { sync, IIsArray } from './components/sync'
import(/* webpackChunkName: "async-test" */ './components/async').then(({default: _}) => {
    _.init()
})

console.log('wangyiyang')
sync()
IIsArray([1,2,3])

