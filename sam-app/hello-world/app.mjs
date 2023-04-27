/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

// export const lambdaHandler = async (event, context) => {
//     try {
//         return {
//             'statusCode': 200,
//             'body': JSON.stringify({
//                 message: 'hello world',
//             })
//         }
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// };
import mysql from 'mysql';

const con = mysql.createConnection({
  host: "database-1.cqbopfcecl99.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "Shonali1998",
  database: "project",
});

export const handler = (event, context, callback) => {
    // allows for using callbacks as finish/error-handlers
    context.callbackWaitsForEmptyEventLoop = false;
  
    var queryString =
      "SELECT USER_ID, FIRST_NAME, LAST_NAME FROM USERACCOUNTS WHERE USER_TYPE_ID = '1'";
    console.log(queryString);
    console.log("print..................")
  
    con.query(queryString, function (err, result) {
      if (err) {
        console.log(err) 
        throw err
        }
        console.log("read..............");
      console.log(JSON.stringify(result));
      

      var response = {
        statusCode: 200,
        headers: {
          my_header: "my_value",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: '{ "data":' + JSON.stringify(result) + "} ",
        isBase64Encoded: false,
      };
      callback(null, response);
    });

};
