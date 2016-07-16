function distancia(a, b) {
	var x = Math.abs(a.posicion_x-b.posicion_x);
	var y = Math.abs(a.posicion_y-b.posicion_y);
	var d = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	return d;
}

var intervalo_ataque_caballero;
var intervalo_movimiento_caballero;
var intervalo_ataque_arquera;
var intervalo_movimiento_arquera;

var caballero = {
	nombre: "caballero",
	vida: 1056,
	f_ataque: 120,
	f_defensa:0,
	velocidad_ataque: 1.1,
	velocidad_movimiento: 5,
	alcance: 1,
	vivo: true,
	posicion_x: Math.floor((Math.random()*50)+1),
	posicion_y: Math.floor((Math.random()*50)+1),
	atacar: function(objetivo) {
		console.log(this.nombre+" atacando a "+objetivo.nombre);
		objetivo.vida  -= this.f_ataque/this.velocidad_ataque;
		if (objetivo.vida<= 0) {
			objetivo.vivo = false;
			clearInterval(intervalo_ataque_caballero);
			console.log(objetivo.nombre+" murio");
		}
	},
	ir_a_objetivo: function(objetivo) {
		var _this = this;
		intervalo_movimiento_caballero =  setInterval(function(){
			if (objetivo.posicion_x>_this.posicion_x+_this.alcance) {
				// Si esta por izquiera en x, que se mueva a la der
				_this.posicion_x += _this.velocidad_movimiento;
			} else if(objetivo.posicion_x<_this.posicion_x-_this.alcance) {
				// Si esta por derecha en x, que se mueva a la izq
				_this.posicion_x -= _this.velocidad_movimiento;
			}
			if (objetivo.posicion_y>_this.posicion_y+_this.alcance) {
				// Si esta por arriba en y, que baje
				_this.posicion_y += _this.velocidad_movimiento
			} else if(objetivo.posicion_y<_this.posicion_y-_this.alcance) {
				// Si esta por debajo, que suba
				_this.posicion_y -= _this.velocidad_movimiento;
			}
			console.log(_this.nombre+" ("+_this.posicion_x+"; "+_this.posicion_y+")");
		},1000);
	},
	comprobar_distancia_con: function(objetivo) {
		var _this = this;
		if (distancia(this, objetivo) <= this.alcance) {
			clearInterval(intervalo_movimiento_caballero);
			intervalo_ataque_caballero = setInterval(function(){
				_this.atacar(objetivo);
			},1000);
		}
	},
	stop: function(){
		clearInterval(intervalo_ataque_caballero);
		clearInterval(intervalo_movimiento_caballero);
	}
}

var arquera = {
	nombre: "arquera",
	vida: 200,
	f_ataque: 64,
	f_defensa:0,
	velocidad_ataque: 1.2,
	velocidad_movimiento: 5,
	alcance: 5,
	vivo: true,
	posicion_x: Math.floor((Math.random()*50)+1),
	posicion_y: Math.floor((Math.random()*50)+1),
	atacar: function(objetivo) {
		console.log(this.nombre+" atacando a "+objetivo.nombre);
		objetivo.vida  -= this.f_ataque/this.velocidad_ataque;
		if (objetivo.vida<= 0) {
			objetivo.vivo = false;
			console.log(objetivo.nombre+" murio");
		}
	},
	ir_a_objetivo: function(objetivo) {
		var _this = this;
		intervalo_movimiento_arquera = setInterval(function(){
			if (objetivo.posicion_x>_this.posicion_x+_this.alcance) {
				// Si esta por izquiera en x, que se mueva a la der
				_this.posicion_x += _this.velocidad_movimiento;
			} else if(objetivo.posicion_x<_this.posicion_x-_this.alcance) {
				// Si esta por derecha en x, que se mueva a la izq
				_this.posicion_x -= _this.velocidad_movimiento;
			}
			if (objetivo.posicion_y>_this.posicion_y+_this.alcance) {
				// Si esta por arriba en y, que baje
				_this.posicion_y += _this.velocidad_movimiento
			} else if(objetivo.posicion_y<_this.posicion_y-_this.alcance) {
				// Si esta por debajo, que suba
				_this.posicion_y -= _this.velocidad_movimiento;
			}
			console.log(_this.nombre+" ("+_this.posicion_x+"; "+_this.posicion_y+")");
		},1000);
	},
	comprobar_distancia_con: function(objetivo) {
		if (distancia(this, objetivo) <= this.alcance) {
			clearInterval(intervalo_movimiento_arquera);
			this.intervalo_ataque(objetivo);
		}
	},
	intervalo_ataque: function(objetivo){
		var _this = this;
		intervalo_ataque_arquera = setInterval(function(){
			_this.atacar(objetivo);
		},1000);
	},
	stop: function(){
		clearInterval(intervalo_ataque_arquera);
		clearInterval(intervalo_movimiento_arquera);
	}
}

function myStopFunction(){
	clearInterval(intervalo_movimiento_caballero);
	clearInterval(intervalo_ataque_caballero);
	clearInterval(intervalo_movimiento_arquera);
	clearInterval(intervalo_ataque_arquera);
	clearInterval(juego);
}

console.log("Caballero ("+caballero.posicion_x+"; "+caballero.posicion_y+")");
console.log("Arquera ("+arquera.posicion_x+"; "+arquera.posicion_y+")");
var enJuego = true;

var juego = setInterval(function(){
	if (!caballero.vivo || !arquera.vivo) {
		var ganador;
		if (caballero.vivo) {
			ganador = caballero.nombre;
		} else if (arquera.vivo) {
			ganador = arquera.nombre;
		}
		console.log("Se termino el juego...");
		console.log("Gano: "+ganador);
		enJuego = false;
	}
	if (enJuego) {
		caballero.ir_a_objetivo(arquera);
		caballero.comprobar_distancia_con(arquera);
		arquera.ir_a_objetivo(caballero);
		arquera.comprobar_distancia_con(caballero);
	} else if(!enJuego){
		myStopFunction();
		arquera.stop();
		caballero.stop();
	}
},1000);