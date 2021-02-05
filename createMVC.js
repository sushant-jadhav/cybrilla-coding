const fs = require('fs');
const modelName = process.argv.splice(2,2)[0];
let source = 'role';
let destination = modelName;
// File destination.txt will be created or overwritten by default.
fs.copyFile('./app/models/'+source+'.model.js', './app/models/'+destination+'.model.js', (err) => {
  if (err) throw err;
  console.log(source+' was copied to model '+destination);
});

fs.copyFile('./app/routes/'+source+'.routes.js', './app/routes/'+destination+'.routes.js', (err) => {
    if (err) throw err;
    console.log(source+' was copied to routes '+destination);
});

fs.copyFile('./app/controller/'+source+'.controller.js', './app/controller/'+destination+'.controller.js', (err) => {
    if (err) throw err;
    console.log(source+' was copied to controller '+destination);
});

var data = fs.readFileSync('./app/models/index.js').toString().split("\n");
data.splice(35, 0, 'db.'+destination+'s = require("./'+destination+'.model")(sequelize, Sequelize);');
var text = data.join("\n");

fs.writeFile('./app/models/index.js', text, function (err) {
  if (err) return console.log(err);
  console.log(source +' was added to model index.');
});

var appData = fs.readFileSync('app.js').toString().split("\n");
appData.splice(40, 0, 'require("./app/routes/'+destination+'.routes")(app);');
var text = appData.join("\n");

fs.writeFile('app.js', text, function (err) {
  if (err) return console.log(err);
  console.log(destination +' was added to app.js.');
});
