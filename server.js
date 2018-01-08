const config = require('./config.js')
const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)
const dgram = require('dgram')

const terminales = config.terminales
const estados = config.estados
// const terminales = [
// 	{ codigoPrimario: 1, nombre: 'Ward', puerto: 10003, velocidad:0, estado: '', ot: '', velObjetivo: 0 },
// 	{ codigoPrimario: 3, nombre: 'Staley', puerto: 10008, velocidad:0, estado: '', ot: '', velObjetivo: 0 }
// ]

//datagramas
terminales.map( (obj) => {
	const serverUDP = dgram.createSocket('udp4')
	serverUDP.bind(obj.puerto)
	serverUDP.on('listening', () => {
		const address = serverUDP.address();
		console.log(`Server de datagramas escuchando en ${address.address}:${address.port}`)
	})
	serverUDP.on('error', () => {
		console.log(`Server de datagramas con error:\n${err.stack}`)
		serverUDP.close()
	})
	serverUDP.on('message', (msg, rinfo) => {
		const dataString = msg.toString()
	    const data = dataString.split('|')
	    let codigoPrimario = data[1] ? data[1] : '0'
	    let velocidad = data[12] ? data[12] : '0'
	    let estado = data[3] ? data[3] : ''
	    let ot = data[6].split(' ')[0]
	    velocidad = velocidad //completarConCeros(velocidad)
	    terminales.find((term) => {
	    	if(term.codigoPrimario === parseInt(codigoPrimario)) {	    	
	    		term.velocidad = velocidad
	    		term.estado = estados.filter( e => e.alias == estado.substring(0,4).toLowerCase())[0].nombre   
	    		term.ot = ot
	    	}
	    })	    
	})
})

//servidor http
app.use(express.static("./public"))

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/public/index.html')
// })

server.listen(3000, () => {
	console.log("Listen port 3000!")
})

//socket
io.on('connection', (socket) => {
	socket.on('disconnect', data => console.log(`Desconectado: ${data}`))	
	setInterval( () => { enviarMensaje(socket)} ,3000)
})

function enviarMensaje (socket) {
	socket.emit('messageChannel', terminales)
}

function completarConCeros(dato) {
  while(dato.length<6) {
    dato = '0' + dato
  }
  return dato
}