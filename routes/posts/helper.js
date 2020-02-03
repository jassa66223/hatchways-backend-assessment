module.exports ={

    sortBy: {
        values: ['id','reads','likes','popularity'],
        default: 'id',
    },
    direction: {
        values: ['asc', 'desc'],
        default: 'asc'
    },
    Validation: {
        tags: {
            isValid: (value) => {return value !== undefined },
            errMsg: "Tags parameter is required"
        },
        paramValCheck: {
            isValid: (value, arr) => {return arr.includes(value) },
            errMsg: "sortBy parameter is invalid"
        }
    }
}