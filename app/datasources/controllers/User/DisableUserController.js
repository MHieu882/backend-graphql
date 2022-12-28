const models = require('../../models');
const Response = require('../../utils/Response');

const disableUser = async (_, args) => {
  try {
    await models.User.updateOne({ _id: args.id }, { status: 'Deactivated' });
    return Response.GeneralResponse(true, `Disable user ${args.id} succesfully`);
  } catch (err) {
    return logger.error(err);
  }
};
module.exports = disableUser;
