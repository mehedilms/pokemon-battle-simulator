export const battleBackgrounds = [
  '/backgrounds/forest.jpg',
  '/backgrounds/cave.jpg',
  '/backgrounds/beach.jpg',
  '/backgrounds/mountain.jpg',
  '/backgrounds/volcano.jpg',
  '/backgrounds/city.jpg',
  '/backgrounds/water.jpg',
  '/backgrounds/electric.jpg',
  '/backgrounds/grass.jpg',
  '/backgrounds/ice.jpg',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world-background/forest.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world-background/cave.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world-background/ocean.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world-background/plains.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world-background/sky.png',
  'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1169&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=1171&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1064&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1170&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1029&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1087&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=1029&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=1170&auto=format&fit=crop',
  // Arrière-plans Pokémon classiques
  'https://i.imgur.com/5koFwvE.png', // Route Pokémon
  'https://i.imgur.com/CUIUKX8.png', // Forêt de Viridian
  'https://i.imgur.com/rRSmT1L.png', // Arène
  'https://i.imgur.com/Wdz1h0c.png', // Cité Azuria
  'https://i.imgur.com/jjcKpXJ.png', // Mont Sélénite
  'https://i.imgur.com/yBVm9LC.png', // Route nocturne
  'https://i.imgur.com/1IJRrx1.png', // Grotte
  'https://i.imgur.com/0e7RQCb.png', // Plage
  'https://i.imgur.com/nCH4WSt.png', // Prairie
  'https://i.imgur.com/cUMwNXS.png', // Volcan
  'https://i.imgur.com/r73ZCIn.png', // Lac
  // Arrière-plans d'arène
  'https://i.imgur.com/Z8XuR6S.png', // Arène Standard
  'https://i.imgur.com/jIV2VGS.png', // Arène Elite 4
  'public/lovable-uploads/1906eefd-1f40-4ec2-b67b-8ab4d80b0227.png', // Arène pixelisée (image fournie par l'utilisateur)
  // Nouveaux fonds d'écran inspirés des images de référence
  'public/lovable-uploads/fe432b52-d05f-406c-a46f-f9db48c2a08b.png', // Fond de combat Pokémon GBA
  'public/lovable-uploads/afaf1fb5-6c92-4b2b-8a42-ea9961f8e351.png', // Fond de combat avec eau
  'public/lovable-uploads/a69c5925-e794-46a0-b26b-5734890c76ea.png', // Fond de combat avec Metagross
  'public/lovable-uploads/a88b3b0d-2d03-4b78-be18-bce054975382.png', // Fond de combat français
  'public/lovable-uploads/9163aed0-39bd-4a78-b98d-ceec4c478127.png', // Fond de combat Dracaufeu
  'public/lovable-uploads/49fe06a2-bfd5-4bf7-b82b-034d778f7dde.png', // Nouveau fond de combat style GBA original
  '#ffffff' // Fond blanc simple
];

export const getRandomBackground = (): string => {
  // Always return white background
  return '#ffffff';
};

export const getTypeBasedBackground = (type: string): string => {
  // Always return white background regardless of type
  return '#ffffff';
};
