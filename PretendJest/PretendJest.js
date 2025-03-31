
let mock_data = {}
function fn(fake_in) {

    const fake = fake_in ? fake_in : x => x

    let stub = (...args) => {
        mock_data[stub].timesCalled += 1
        mock_data[stub].args = args
        return fake(...args)
    }
    mock_data[stub] = {
        timesCalled: 0,
    }
    return stub
}

function expect(mock_fn) {
    return 
}


function toHaveBeenCalledWith(...expectedParams) {

}


module.exports = {fn:fn}