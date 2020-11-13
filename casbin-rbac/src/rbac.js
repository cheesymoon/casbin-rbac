const { newEnforcer } = require('casbin');
const mysql = require('mysql');
const { BasicAdapter } = require('casbin-basic-adapter');

let enforcer;

/**
 * @return Promise<Enforcer>
 */
async function getEnforcer() {
  if (!enforcer) {
    enforcer = await newEnforcer(
      `${__dirname}/rbac/model.conf`,
      `${__dirname}/rbac/policy.csv`
    );
  }
  return Promise.resolve(enforcer);
}






// async function getEnforcer() {
//   // Initialize a Basic adapter and use it in a Node-Casbin enforcer:
//   // The adapter can not automatically create database.
//   // But the adapter will automatically and use the table named "casbin_rule".
//   if (!enforcer) {
//   const adapter = await BasicAdapter.newAdapter('mysql',
//     new mysql.createConnection({
//       user: 'root',
//       database: 'casbin',
//       password: 'root',
//       host: 'casbin_mysql',
//     }));

//     enforcer = await newEnforcer(`${__dirname}/rbac/model.conf`, adapter);
//   }
//   return Promise.resolve(enforcer);
// }


module.exports.getEnforcer = getEnforcer;











// supported models
// https://casbin.org/docs/en/supported-models

// https://github.com/casbin/casbin/tree/master/examples

// async function main() {
//   const e = await newEnforcer(`${__dirname}/rbac/model.conf`, `${__dirname}/rbac/policy.csv`);
//   const sub = 'alice'; // the user that wants to access a resource.
//   const obj = 'data1'; // the resource that is going to be accessed.
//   const act = 'read'; // the operation that the user performs on the resource.

//   console.log(await e.getAllSubjects());
//   console.log(await e.getAllRoles());
//   console.log('--------------------------------');
//   console.log('alice:', await e.getRolesForUser('alice'));
//   console.log('bob:', await e.getRolesForUser('bob'));

//   if ((await e.enforce(sub, obj, act)) === true) {
//     // permit alice to read data1
//     console.log('All good alice');
//   } else {
//     console.log('fuck off alice');
//   }

//   if ((await e.enforce('bob', 'data4', 'write')) === true) {
//     console.log('All good bob');
//   } else {
//     console.log('fuck off bob');
//   }
// }

// main();

// // require('./api');
