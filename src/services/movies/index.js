import { request } from '../http';

const movies_service = {
  getMoviesByPage: (page) => {
    return request.get('movies/'+ page);
  },
  getFavoriteMovies: (id, status) => {
    return request.get('movies/favorite/'+ id + '/' + status);
  },
  insertFavoriteMovie: (body) => {
    return request.post('movies/favorite', body);
  },
  insertMovie: (body) => {
    return request.post('movies', body);
  },
  deleteMovie: (id) => {
    return request.delete('movies/'+ id);
  },
}

export {
  movies_service
}