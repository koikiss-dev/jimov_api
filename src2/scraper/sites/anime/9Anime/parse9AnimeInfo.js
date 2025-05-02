export function parseAnimeInfo(infoString, info) {
  const anime = {};

  // Tipo
  const typeRegex = /Type:\s+(\w+)/;
  const typeMatch = infoString.match(typeRegex);
  anime.type = typeMatch ? typeMatch[1] : null;

  // Estudio
  const studioRegex = /Studio:\s+([\w\s]+)/;
  const studioMatch = infoString.match(studioRegex);
  anime.studio = studioMatch ? studioMatch[1] : null;

  // Fecha de emisión
  const dateRegex = /Date aired:\s+([\w\s,:]+)/;
  const dateMatch = infoString.match(dateRegex);
  anime.dateAired = dateMatch ? dateMatch[1] : null;

  // Día de emisión
  const broadcastRegex = /Broadcast:\s+([\w\s,:]+)/;
  const broadcastMatch = infoString.match(broadcastRegex);
  anime.broadcast = broadcastMatch ? broadcastMatch[1] : null;

  // Estado
  const statusRegex = /Status:\s+(\w+)/;
  const statusMatch = infoString.match(statusRegex);
  anime.status = statusMatch ? statusMatch[1] : null;

  // Género
  const genreRegex = /Genre:\s+([\w\s,]+)/;
  const genreMatch = infoString.match(genreRegex);
  anime.genre = genreMatch ? genreMatch[1].split(", ") : null;

  // País
  const countryRegex = /Country:\s+([\w\s]+)/;
  const countryMatch = info.match(countryRegex);
  anime.country = countryMatch ? countryMatch[1] : null;

  // Puntuación
  const scoresRegex = /Scores:\s+([\d.]+)\s+by\s+([\d,]+)\s+reviews/;
  const scoresMatch = info.match(scoresRegex);
  anime.score = scoresMatch ? parseFloat(scoresMatch[1]) : null;
  anime.numReviews = scoresMatch
    ? parseInt(scoresMatch[2].replace(",", ""))
    : null;

  // Temporada de estreno
  const premieredRegex = /Premiered:\s+([\w\s]+)/;
  const premieredMatch = info.match(premieredRegex);
  anime.premiered = premieredMatch ? premieredMatch[1] : null;

  // Duración de episodios
  const durationRegex = /Duration:\s+(\d+)\s+min/;
  const durationMatch = info.match(durationRegex);
  anime.duration = durationMatch ? parseInt(durationMatch[1]) : null;

  // Número de episodios
  const episodesRegex = /Episodes:\s+(\d+)/;
  const episodesMatch = info.match(episodesRegex);
  anime.episodes = episodesMatch ? parseInt(episodesMatch[1]) : null;

  // Número de vistas
  const viewsRegex = /Views:\s+([\d,]+)/;
  const viewsMatch = info.match(viewsRegex);
  anime.views = viewsMatch ? parseInt(viewsMatch[1].replace(",", "")) : null;

  return anime;
}
