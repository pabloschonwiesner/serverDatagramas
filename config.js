const config = {
	terminales: [
		{nombre: 'Ward', puerto: 10003, codigoPrimario: 1, velObjetivo: 4200, unidad: 'pl/hs', velocidad: 0, estado: '', ot: '' },
		{nombre: 'Staley', puerto: 10008, codigoPrimario: 3, velObjetivo: 7800, unidad: 'pl/hs', velocidad: 0, estado: '', ot: '' }
	],
	instanciaSQL: 'notebookpablo\pablo2014',
	bd: 'pcm',
	usuarioSQL: 'sa',
	passSQL: '0105',
	estados: [
		{nombre: 'Preparación', color: 65535, alias: 'prep' },
		{nombre: 'Producción', color: 65280, alias: 'prod' },
		{nombre: 'Maquina Parada', color: 255, alias: 'maqu' },
		{nombre: 'Mantenimiento', color: 4732827, alias: 'mant' },
	]
}

module.exports = config