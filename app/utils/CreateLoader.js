const DataLoader = require('dataloader');
const loader = require('../datasources/loaders');

function createLoader() {
  return {
    // post
    createownerloader: new DataLoader(loader.batchOwnerOfPost),
    createclapCountloader: new DataLoader(loader.batchClapCount),
    // comment
    createUsercommentloader: new DataLoader(loader.batchUserComment),
    createPostcommentloader: new DataLoader(loader.batchPostComment),
    // user
    createUserFollowloader: new DataLoader(loader.batchUserFollow),
  };
}
module.exports = createLoader;
