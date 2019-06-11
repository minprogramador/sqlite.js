

# init 
```
const sqlite = require('./sqlite');

let config = {
	tabela: 'user',
	file: 'algo.sqlite'
};

let crud = new sqlite(config);

console.log(crud.getConfig());
```


# exemplo then/catch
```
crud.install().then(function(result) {
	console.log(result);
}).catch(function(e) {
	console.log(e);
});
```

# install db
```
const inst = await crud.install();
console.log(inst);
```

# outros exemplos.
```
setTimeout(async _ => {
	try{
		// //#instala bd
		// const inst = await crud.install();
		// console.log(inst);

		const msg = await crud.getAll();
		console.log('Message:', msg.rows);

		// # get/find all user
		//#########################################################

		// # get/find one user id.
		// const msg = await crud.getId(6);
		// console.log('Message:', msg.rows);
		//#########################################################

		// # insert
	 //    let data = {
	 //        name: 'final',
	 //        email: 'final@example.com',
	 //        password : '102030'
	 //    }
		// let vai = await crud.add(data);
		// console.log(vai);
		//#########################################################

//		# update
		// var data = {
		//     name: 'nomenovo',
		//     email: null,
		//     password : null
		// }
		// let id = 1;
		// let up = await crud.up(data, id);
		// console.log(up);

		//#########################################################

//		# delete
		// let id = 12;
		// let deletar = await crud.del(id);
		// console.log(deletar);
		//#########################################################

	}catch(e){
		console.log('error');
	}



}, 1);
```