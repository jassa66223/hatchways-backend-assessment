const model = require('./helper');
const env = require('../../environment');
const axios = require('axios');
const Validation = model.Validation;

module.exports = {
    checkRoute: (req, res, next)=> {
        const q = req.query;

        const params = {
            tags: (!!q.tags)? q.tags: undefined,
            sortBy: q.sortBy || model.sortBy.default,
            direction: q.direction || model.direction.default
        }

         // if tag not valid ... else if sortby or direction not valid else move to next step..
        if(!Validation.tags.isValid(params.tags)) {

            res.status(400).json({error: Validation.tags.errMsg});

        }else if(!(
            Validation.paramValCheck.isValid(params.sortBy, model.sortBy.values) 
                                    && 
            Validation.paramValCheck.isValid(params.direction, model.direction.values)
        )){

            res.status(400).json({error: Validation.paramValCheck.errMsg});

        }else {

            // spliting the tags just in case if it is more than 1 .. separated by ','
            params.tags = params.tags.split(',');

            req.params = params
            next();
        }
    },

    processData: (req, res, next)=>{

        const {params} = req;
        let promise = [];
        let idSet = new Set();  // set of ids of result 
        let returnData = [];  // unique results are stored here


        for (const value in params.tags) {
            promise.push(axios.get(env.parentDataApiUrl+'blog/posts?tag='+params.tags[value])
            .then( resp=>{

                const data = resp.data.posts
                // linear solution 
                for(const item in data) {
                    const instance = data[item]; 
                    if(!idSet.has(instance.id)){
                        returnData.push(instance);
                        idSet.add(instance.id)
                    }
                }

            })
            .catch(error => {
                console.log(error);
            }));

            
        }
        Promise.all(promise)
            .then(()=>{
                console.log(returnData)
                req.posts = returnData;
                next();
            })
            .catch(e=>{
                console.log(e);
            })
    },

    sortNdSend: (req, res, next)=> {
        let {posts, params} = req;
        if(params.direction === 'desc'){
            posts.sort( function(a, b){return b[params.sortBy] - a[params.sortBy]});
            res.status(200).json({posts});
        }else {
            posts.sort( function(a, b){return a[params.sortBy] - b[params.sortBy]});
            res.status(200).json({posts});
            next()
        }
    }

}
