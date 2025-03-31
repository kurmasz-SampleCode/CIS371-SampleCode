pretendJest = require('./PretendJest')

MyController = require('./MyController')

describe('#index', () => {
    
    let c
    let res
    
    
    beforeEach(() => {
        c = new MyController({getData:() => [1, 2, 3, 4]})
        res = {
            render: pretendJest.fn()
        }
    })
    
    it('works', () => {
       c.index(res)
    })
})