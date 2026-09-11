const productos = [
    {
        id: 1,
        nombre: "Anby Demara",
        categoria: "Agent",
        subcategoria: "Eléctrico / Ataque",
        rareza: "S",
        precio: 3000,
        descripcion: "Agente de la facción Cunning Hares. Especialista en combate cuerpo a cuerpo con atributo eléctrico.",
        imagen: "https://zzz.wiki.gg/images/thumb/Anby.png"
    },
    {
        id: 2,
        nombre: "Nicole Demara",
        categoria: "Agent",
        subcategoria: "Ether / Soporte",
        rareza: "S",
        precio: 3000,
        descripcion: "Fundadora de Cunning Hares. Proporciona buffs de daño Ether y control de multitudes.",
        imagen: "https://zzz.wiki.gg/images/thumb/Nicole.png"
    },
    {
        id: 3,
        nombre: "Billy Kid",
        categoria: "Agent",
        subcategoria: "Físico / Ataque",
        rareza: "A",
        precio: 1500,
        descripcion: "Agente de Cunning Hares. Especialista en armas de fuego con alto daño físico sostenido.",
        imagen: "https://zzz.wiki.gg/images/thumb/Billy.png"
    },
    {
        id: 4,
        nombre: "Nekomata",
        categoria: "Agent",
        subcategoria: "Físico / Ataque",
        rareza: "A",
        precio: 1500,
        descripcion: "Miembro de Cunning Hares. Combate rápido con garras, alto daño en área.",
        imagen: "https://zzz.wiki.gg/images/thumb/Nekomata.png"
    },
    {
        id: 5,
        nombre: "Lycaon",
        categoria: "Agent",
        subcategoria: "Hielo / Aturdimiento",
        rareza: "S",
        precio: 3000,
        descripcion: "Agente de Victoria Housekeeping. Experto en aplicar Aturdimiento y romper escudos.",
        imagen: "https://zzz.wiki.gg/images/thumb/Lycaon.png"
    },
    {
        id: 6,
        nombre: "Ellen Joe",
        categoria: "Agent",
        subcategoria: "Hielo / Ataque",
        rareza: "S",
        precio: 3000,
        descripcion: "Miembro de Victoria Housekeeping. Tiburón mecánico con gran AoE y daño explosivo.",
        imagen: "https://zzz.wiki.gg/images/thumb/Ellen.png"
    },
    {
        id: 7,
        nombre: "Steel Cushion",
        categoria: "W-Engine",
        subcategoria: "Bangboo",
        rareza: "S",
        precio: 2400,
        descripcion: "W-Engine exclusivo para agentes de Aturdimiento. Aumenta impacto y daño de aturdimiento.",
        imagen: "https://zzz.wiki.gg/images/thumb/Steel_Cushion.png"
    },
    {
        id: 8,
        nombre: "The Vault",
        categoria: "W-Engine",
        subcategoria: "Bangboo",
        rareza: "S",
        precio: 2400,
        descripcion: "W-Engine para agentes de Ataque. Proporciona penetración de defensa y daño crítico.",
        imagen: "https://zzz.wiki.gg/images/thumb/The_Vault.png"
    },
    {
        id: 9,
        nombre: "Lunar Decrescent",
        categoria: "W-Engine",
        subcategoria: "Bangboo",
        rareza: "A",
        precio: 1200,
        descripcion: "W-Engine versátil. Aumenta daño de habilidad definitiva y regeneración de energía.",
        imagen: "https://zzz.wiki.gg/images/thumb/Lunar_Decrescent.png"
    },
    {
        id: 10,
        nombre: "Rainforest Gourmet",
        categoria: "W-Engine",
        subcategoria: "Bangboo",
        rareza: "A",
        precio: 1200,
        descripcion: "W-Engine para agentes de Soporte. Mejora buffs de equipo y curación.",
        imagen: "https://zzz.wiki.gg/images/thumb/Rainforest_Gourmet.png"
    },
    {
        id: 11,
        nombre: "Shockstar Disco",
        categoria: "Drive Disc",
        subcategoria: "Set de 2 / 4 piezas",
        rareza: "S",
        precio: 800,
        descripcion: "Set de discos Shockstar. 2 pzas: +10% ATK. 4 pzas: Daño eléctrico +25% tras usar EX Special.",
        imagen: "https://zzz.wiki.gg/images/thumb/Shockstar.png"
    },
    {
        id: 12,
        nombre: "Woodpecker Electro",
        categoria: "Drive Disc",
        subcategoria: "Set de 2 / 4 piezas",
        rareza: "A",
        precio: 400,
        descripcion: "Set de discos Woodpecker. 2 pzas: +10% ATK. 4 pzas: Daño eléctrico +20% por 10s tras Chain Attack.",
        imagen: "https://zzz.wiki.gg/images/thumb/Woodpecker.png"
    },
    {
        id: 13,
        nombre: "Freedom Blues",
        categoria: "Drive Disc",
        subcategoria: "Set de 2 / 4 piezas",
        rareza: "A",
        precio: 400,
        descripcion: "Set de discos Freedom. 2 pzas: +12% ATK. 4 pzas: Daño físico +20% al golpear enemigo aturdido.",
        imagen: "https://zzz.wiki.gg/images/thumb/Freedom_Blues.png"
    },
    {
        id: 14,
        nombre: "Dennies",
        categoria: "Material",
        subcategoria: "Moneda principal",
        rareza: "Común",
        precio: 1,
        descripcion: "Moneda principal del juego. Se usa para compras, mejoras y gacha. Pack de 10,000 Dennies.",
        imagen: "https://zzz.wiki.gg/images/thumb/Dennies.png"
    },
    {
        id: 15,
        nombre: "EXP Coins",
        categoria: "Material",
        subcategoria: "Experiencia",
        rareza: "Común",
        precio: 50,
        descripcion: "Monedas de experiencia para subir nivel de agentes. Pack de 50,000 EXP.",
        imagen: "https://zzz.wiki.gg/images/thumb/EXP_Coins.png"
    },
    {
        id: 16,
        nombre: "Core Chips",
        categoria: "Material",
        subcategoria: "Mejora W-Engine",
        rareza: "Poco común",
        precio: 200,
        descripcion: "Material para mejorar W-Engines. Necesario para ascender armas a nivel 40+.",
        imagen: "https://zzz.wiki.gg/images/thumb/Core_Chips.png"
    },
    {
        id: 17,
        nombre: "Ether Reactor",
        categoria: "Material",
        subcategoria: "Ascensión Agent",
        rareza: "Raro",
        precio: 500,
        descripcion: "Material de ascensión para agentes de atributo Ether. Drop de jefes semanales.",
        imagen: "https://zzz.wiki.gg/images/thumb/Ether_Reactor.png"
    },
    {
        id: 18,
        nombre: "Uniforme NEPS - Anby",
        categoria: "Skin",
        subcategoria: "Cosmético Agent",
        rareza: "Épico",
        precio: 1800,
        descripcion: "Skin exclusiva para Anby. Cambia apariencia y efectos visuales de habilidades.",
        imagen: "https://zzz.wiki.gg/images/thumb/Anby_NEPS.png"
    },
    {
        id: 19,
        nombre: "Traje Victoriano - Ellen",
        categoria: "Skin",
        subcategoria: "Cosmético Agent",
        rareza: "Épico",
        precio: 1800,
        descripcion: "Skin temática para Ellen Joe. Incluye animaciones de idle y victoria personalizadas.",
        imagen: "https://zzz.wiki.gg/images/thumb/Ellen_Victorian.png"
    },
    {
        id: 20,
        nombre: "Bangboo Plushie Set",
        categoria: "Skin",
        subcategoria: "Cosmético Bangboo",
        rareza: "Raro",
        precio: 800,
        descripcion: "Set de peluches decorativos para tu Bangboo. Incluye 5 diseños coleccionables.",
        imagen: "https://zzz.wiki.gg/images/thumb/Bangboo_Plush.png"
    }
];

let nextId = 21;

export const obtenerTodos = async () => [...productos];

export const obtenerPorId = async (id) => productos.find(p => p.id === id);

export const crear = async (datos) => {
    const nuevo = { id: nextId++, ...datos };
    productos.push(nuevo);
    return nuevo;
};

export const actualizar = async (id, datos) => {
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return null;
    productos[index] = { ...productos[index], ...datos };
    return productos[index];
};

export const eliminar = async (id) => {
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return false;
    productos.splice(index, 1);
    return true;
};