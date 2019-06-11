
var sqlinit = `
CREATE TABLE user (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text, 
    email text UNIQUE, 
    password text, 
    CONSTRAINT email_unique UNIQUE (email)
);`;

var configdb = {
	tabela: null,
	file: 'db.sqlite'
};

module.exports = function(value) {

	configdb = Object.assign(configdb, value);

	let db = require("./database.js")(configdb.file);

	const install = function(nsql='') {
		if(nsql !== '') {
			sqlinit = nsql;
		}

		return new Promise(function (resolve, reject) {
		    db.run(sqlinit, (err) => {
		        if (err) {
		        	reject({'error':err});
		        }else{
		        	resolve({msg: 'database criada com sucesso!'});
		        }
		    });
		});
	};
	
	const getAll = function() {
		let sql = `select * from ${configdb.tabela}`;
		return new Promise(function (resolve, reject) {
			db.all(sql, [], (err, rows) => {
				if (err) {
					reject({'error': err});
				} else {
			        resolve({statement: this, rows: rows});
				}
			});
		});
	};

	const getId = function(id) {
		let sql = `select * from ${configdb.tabela} where id = ?`;
	    let params = [id];

		return new Promise(function (resolve, reject) {
			db.get(sql, params, (err, rows) => {
				if (err) {
					reject({'error': err});
				} else {
			        resolve({statement: this, rows: rows});
				}
			});
		});
	};

	const add = function(data) {
		let keys = Object.keys(data).join(', ');
		let vals = Object.values(data);

	    let sql =`INSERT INTO ${configdb.tabela} (${keys}) VALUES (?,?,?)`;
	    let params =vals;

		return new Promise(function (resolve, reject) {
			db.run(sql, params, (err, result) => {
				if (err) {
					reject({'error': err});
				} else {
			        resolve({
			            "message": "success",
			            "data": data,
			            "id" : this.lastID
	    			});
				}
			});
		});
	};

	const up = function(data, id) {

		let keys = Object.keys(data);
		let vals = Object.values(data);
		vals.push(id);

		var rebels = keys.map(function (pilot) {
			return `${pilot} = COALESCE(?,${pilot})`;
		});
		let keysload = rebels.join(', ');

		let sql = `UPDATE ${configdb.tabela} set ${keysload} WHERE id = ?`;
		let params = vals;

		return new Promise(function (resolve, reject) {
			db.run(sql, params, (err, result) => {
				if (err) {
					reject({'error': err});
				} else {
			        resolve({
			            message: "success",
			            data: data,
			            changes: this.changes
			        });
				}
			});
		});
	};

	const del = function(id){
		let sql = `DELETE FROM ${configdb.tabela} WHERE id = ?`;

		return new Promise(function (resolve, reject) {
			db.run(sql, id, function (err, result) {
		        if (err){
		        	reject({"error": err.message});
		        }else{
			        resolve({"message":"deleted", changes: this.changes});
		    	}
		    });
	    });
	};

	const getConfig = function() {
		return configdb;
	};

	return { install, getConfig, getAll, getId, add, up, del }
}

