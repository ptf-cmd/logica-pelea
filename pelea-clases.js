"use strict";

const colors = require('colors');

class Entidad {
	constructor(nombre, x, y, vida, f_ataque, velocidad_ataque, rango, movimiento) {
		this.nombre = nombre;
		this.posicion_x = x;
		this.posicion_y = y;
		this.vida = vida;
		this.f_ataque = f_ataque;
		this.v_ataque = velocidad_ataque;
		this.alcance = rango;
		this.v_movimiento = movimiento
	}

	static distancia(a, b) {
		var dx = a.posicion_x - b.posicion_x;
		var dy = a.posicion_y - b.posicion_y;
		var d = Math.sqrt(dx*dx + dy*dy);
		return d;
	}

	atacar(objetivo) {
		objetivo.vida -= this.f_ataque/this.v_ataque;
	}

	ir_a(objetivo) {
		if (objetivo.posicion_x>this.posicion_x+this.alcance) {
			// Si esta por izquiera en x, que se mueva a la der
			this.posicion_x += this.v_movimiento;
		} else if(objetivo.posicion_x<this.posicion_x-this.alcance) {
			// Si esta por derecha en x, que se mueva a la izq
			this.posicion_x -= this.v_movimiento;
		}
		if (objetivo.posicion_y>this.posicion_y+this.alcance) {
			// Si esta por arriba en y, que baje
			this.posicion_y += this.v_movimiento
		} else if(objetivo.posicion_y<this.posicion_y-this.alcance) {
			// Si esta por debajo, que suba
			this.posicion_y -= this.v_movimiento;
		}
		switch(this.nombre) {
			case "p1":
				console.log((this.nombre+" ("+this.posicion_x+"; "+this.posicion_y+")").red);
				break;
			case "p2":
				console.log((this.nombre+" ("+this.posicion_x+"; "+this.posicion_y+")").blue);
				break;
			default:
				console.log(this.nombre+" ("+this.posicion_x+"; "+this.posicion_y+")");
				break;
		}
	}

	ver_en_rango(objetivo) {
		if (Entidad.distancia(this, objetivo) <= this.alcance) {
			return true;
		} else {
			return false;
		}
	}

}

var p1 = new Entidad("p1",Math.floor((Math.random()*100)+1), Math.floor((Math.random()*100)+1), 1000, 120, 1.1, 1, 5);
var p2 = new Entidad("p2",Math.floor((Math.random()*100)+1), Math.floor((Math.random()*100)+1), 1000, 150, 1.4, 1, 5);

console.log("-------------xxxx-------------".white);
var juego = setInterval(function(){

	if (p1.vida > 0 && p2.vida > 0) {
		p1.ir_a(p2);
		console.log(("Vida de p2: "+p2.vida).red);
		if (p1.ver_en_rango(p2)) {
			p1.atacar(p2);
		}
		p2.ir_a(p1);
		console.log(("Vida de p1: "+p1.vida).blue);
		if (p2.ver_en_rango(p1)) {
			p2.atacar(p1);
		}
	} else if (p1.vida <=0 ) {
		console.log("Gano p1".blue);
		clearInterval(juego);
	} else if (p2.vida <=0 ) {
		console.log("Gano p2".red);
		clearInterval(juego);
	}
	console.log("-------------xxxx-------------".white);
},1000)