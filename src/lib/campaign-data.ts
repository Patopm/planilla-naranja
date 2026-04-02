export const campaign = {
	name: "Planilla Naranja",
	school: "Tecmilenio Querétaro",
	slogan: "Diferentes por decisión. Cambio real por convicción.",
	instagramUrl:
		"https://www.instagram.com/planilla_naranja_qro?igsh=M2l5NHh1ODF4cmxp",
};

export const president = {
	name: "Isabel Molina",
	role: "Presidenta",
	tagline: "Liderazgo cercano, visión clara y ejecución con impacto.",
	bio: "Conecta a las coordinaciones, escucha a la comunidad y transforma propuestas en proyectos medibles.",
};

export const coordinations = [
	{
		key: "athletics",
		name: "Athletics",
		icon: "AT",
		coordinator: "Patricio Piña",
		coordinatorTagline:
			"Liderazgo, organización y trabajo en equipo para impulsar el crecimiento deportivo.",
		spirits: ["Julio Guzman"],
		description:
			"Impulsar apoyos económicos, mayor visibilidad y mejores oportunidades de desarrollo para los equipos y estudiantes interesados en el deporte.",
		proposals: [
			"Buscar patrocinadores para los equipos representativos.",
			"Promover las redes sociales de los equipos representativos.",
			"Impulsar nuevos equipos representativos.",
		],
	},
	{
		key: "comunicacion",
		name: "Comunicación",
		icon: "CM",
		coordinator: "Fernanda Pozo",
		coordinatorTagline:
			"Una conexión entre planilla y comunidad para que juntos estemos en la misma línea",
		spirits: ["Adrián Lopez"],
		description:
			"Unión estudiantil, mayor visibilidad y participación de los estudiantes",
		proposals: [
			"Fomentar que los estudiantes compartan experiencias, talentos o proyectos.",
			"Publicaciones mostrando cómo trabaja la planilla de forma transparente.",
			"Realizar algún desfile en conjunto con otra coordinación.",
		],
	},
	{
		key: "arte-cultura",
		name: "Arte y Cultura",
		icon: "AC",
		coordinator: "Melanie Mondragon",
		coordinatorTagline:
			"Empatizando y liderando proyectos que realmente conecten con la comunidad estudiantil.",
		spirits: [],
		description:
			"Más visibilidad al talento creativo, fomentar la participación estudiantil y una comunidad agradable.",
		proposals: [
			"Galería estudiantil interactiva donde los estudiantes puedan exponer, votar y formar parte de exposiciones con tematicas distintas.",
			"Experiencias culturales que combinen entretenimiento, convivencia y participación.",
			"Festival cultural anual donde los estudiantes puedan participar en experiencias artísticas, y se inviten a artistas o ponentes externos.",
		],
	},
	{
		key: "e-sports",
		name: "E-Sports",
		icon: "ES",
		coordinator: "Erick Rubio Lugo",
		coordinatorTagline:
			"Comunicación y empatía para conectar y entender las necesidades de los jugadores.",
		spirits: ["Tania Portillo", "Frida Anaya", "Diether Alonso"],
		description:
			"Conseguir espacios para los equipos y atraer más público interesado.",
		proposals: [
			"Espacios para entrenamientos y mejora de representativo de E-Sport.",
			"Realizar eventos para promover la comunidad de E-Sports.",
		],
	},
	{
		key: "finanzas",
		name: "Finanzas",
		icon: "FN",
		coordinator: "Alan Flores",
		coordinatorTagline:
			"Enfocado en convertir ideas en acciones que generen beneficios reales para los estudiantes.",
		spirits: [],
		description:
			"Impulsar iniciativas que faciliten la vida financiera de los estudiantes y generen oportunidades reales dentro del campus.",
		proposals: [
			"Espacio que estudiantes vendan y den a conocer sus negocios.",
			"Expandir espacios colectivos para estudiantes mediante construcción colectiva, así como mejorar el Tecmihub.",
		],
	},
	{
		key: "impacto-social",
		name: "Impacto Social",
		icon: "IS",
		coordinator: "Emma Hernández",
		coordinatorTagline:
			"El liderazgo, alegría y compromiso me hacen convertir ideas en acciones con impacto.",
		spirits: ["Ana Olvera"],
		description:
			"Apoyo a distintas causas sociales, actividades para apoyar a personas vulnerables, visitas a empresas con impacto social.",
		proposals: [
			"Competencia mensual entre carreras para apoyar causas sociales.",
			"Día universitario dedicado a ayudar a distintas causas.",
			"Visitas a empresas con impacto social.",
		],
	},
] as const;

export const highlightedProposals = [
	{
		title: "Mejores espacios estudiantiles",
		area: "Finanzas",
		description:
			"Expandir espacios colectivos para estudiantes mediante construcción colectiva, así como mejorar el Tecmihub.",
	},
	{
		title: "Un día ayudando juntos",
		area: "Impacto Social",
		description:
			"Buscar la participación en varias actividades en conjunto a casas hogares, asilos y hospitales.",
	},
	{
		title: "Festival Semanal Cultural TecMilenio",
		area: "Arte y Cultura",
		description:
			"Realizar y dar visibilidad a las habilidades artísticas y culturales de los estudiantes que deseen participar.",
	},
	{
		title: "Espacios para entrenamientos",
		area: "E-Sports",
		description:
			"Espacios para entrenamientos y mejora de representativo de E-Sport.",
	},
	{
		title: "Desfile de modas",
		area: "Comunicación",
		description:
			"Aliarnos con organizaciones para realizar un desfile de modas con causa.",
	},
	{
		title: "Patrocinadores para equipos representativos",
		area: "Athletics",
		description:
			"Buscar patrocinadores para equipos representativos para apoyar financieramente a los deportistas.",
	},
] as const;
