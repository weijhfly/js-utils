
// let const
;(function(){
	let $let = 5;
	const CONST = 1;

	$let ++;

	let b = CONST;
	b ++;

	console.log($let,CONST,b);
}())


//解构函数
;(function(){
	let [a,b,c] = [1,2,3,4];

	console.log(a,b,c);

	function foo({x, y = 5} = {}) {
	  console.log(x, y);
	}

	foo({x:4})
}())

//箭头函数
;(function(){
	let v = v => v;

	console.log(v('xx'));

	let j = (x,y) => {
		let z = x + y;

		return z;
	}
	console.log(j(1,2));
}())

//class
;(function(){
	class Point {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		toString() {
			return '(' + this.x + ', ' + this.y + ')';
		}
	}
	console.log(new Point('你好','吗').toString());
}())

//promise
;(function(){
	let promise = new Promise(function(resolve, reject) {
		console.log('Promise');
		resolve();
	});

	promise.then(function() {
		console.log('resolved.');
	});

	console.log('Hi!');
}())

// async
;(function(){
	async function testSync() {
	     const response = await new Promise(resolve => {
	         setTimeout(() => {
	             resolve("async await test...");
	          }, 1000);
	     });
	     console.log(response);
	}
	testSync();//async await test...
}())