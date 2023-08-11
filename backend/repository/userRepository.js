const aws = require("aws-sdk");
aws.config.update({
    region: 'sa-east-1'
});
const dynamodb = new aws.DynamoDB.DocumentClient();
const userTable = 'vial-calculator-users';
const hmac = require("crypto-js/hmac-sha256");

async function getUserByEmail(email) {
    const params = {
        TableName: userTable,
        Key: {
            email: email
        }
    };

    return await dynamodb.get(params).promise().then(
        res => res.Item,
        error => console.error(`Error occurred while getting user with email: ${email}`));
}

async function addUser(user) {
    user.password = hmac(user.password, process.env.pwd_salt).toString();

    const params = {
        TableName: userTable,
        Item: user
    };

    return await dynamodb.put(params).promise().then(
        () => true,
        error => console.log(`Error occurred while adding user with email: ${user.email}`)
    );
}

module.exports.getUserByEmail = getUserByEmail;
module.exports.addUser = addUser;