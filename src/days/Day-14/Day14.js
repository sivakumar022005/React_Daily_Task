import React, { use, useState, Suspense } from "react";

// Movie database (sample data)
const movies = [
  {
    id: 1,
    title: "Fight Club",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    duration: "2h 28m",
    director: "Christopher Nolan",
    language: "English",
    description:
      "A skilled thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into someone's mind.",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    emoji: "🌀",
    color: "from-purple-900 to-indigo-950",
  },
  {
    id: 2,
    title: "Deadpool",
    year: 2014,
    genre: "Adventure",
    rating: 8.7,
    duration: "2h 49m",
    director: "Christopher Nolan",
    language: "English",
    description:
      "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    emoji: "🚀",
    color: "from-blue-900 to-slate-950",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    duration: "2h 32m",
    director: "Christopher Nolan",
    language: "English",
    description:
      "Batman faces his greatest challenge when the Joker creates chaos across Gotham City.",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    emoji: "🦇",
    color: "from-gray-800 to-black",
  },
  {
    id: 4,
    title: "Iron Man",
    year: 2009,
    genre: "Fantasy",
    rating: 7.9,
    duration: "2h 42m",
    director: "James Cameron",
    language: "English",
    description:
      "A former Marine journeys to Pandora and becomes torn between following orders and protecting a new world.",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    emoji: "🌌",
    color: "from-cyan-900 to-blue-950",
  },
  {
    id: 5,
    title: "Bullet Train",
    year: 2019,
    genre: "Drama",
    rating: 8.4,
    duration: "2h 2m",
    director: "Todd Phillips",
    language: "English",
    description:
      "A struggling comedian's journey into isolation and rejection leads him toward a dark transformation.",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    emoji: "🃏",
    color: "from-red-950 to-orange-950",
  },
  {
    id: 6,
    title: "American Psycho",
    year: 2019,
    genre: "Action",
    rating: 8.4,
    duration: "3h 1m",
    director: "Anthony Russo, Joe Russo",
    language: "English",
    description:
      "The Avengers assemble once more to reverse the devastating actions of Thanos and restore balance to the universe.",
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    emoji: "⚡",
    color: "from-amber-900 to-red-950",
  },
];

// Promise cache
// This keeps the same Promise for each movie.
const moviePromises = new Map();

function getMoviePromise(movieId) {
  if (!moviePromises.has(movieId)) {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        const movie = movies.find((item) => item.id === movieId);
        resolve(movie);
      }, 1200);
    });

    moviePromises.set(movieId, promise);
  }

  return moviePromises.get(movieId);
}

// Movie details component
function MovieDetails({ moviePromise }) {
  // React 19 use() reads the Promise.
  // Suspense handles the pending state.
  const movie = use(moviePromise);

  if (!movie) {
    return <p className="text-gray-400">Movie not found.</p>;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
      {/* Movie Hero */}
      <div
        className={`relative flex min-h-72 items-center justify-center bg-gradient-to-br ${movie.color} p-8`}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
            Featured Movie
          </p>

          <div className="text-8xl drop-shadow-2xl">
            {movie.emoji}
          </div>

          <h2 className="mt-5 text-4xl font-black text-white">
            {movie.title}
          </h2>

          <p className="mt-2 text-sm text-white/70">
            {movie.year} · {movie.genre}
          </p>
        </div>

        <div className="absolute right-5 top-5 rounded-xl border border-white/20 bg-black/30 px-4 py-2 backdrop-blur">
          <span className="text-yellow-400">★</span>
          <span className="ml-2 font-bold text-white">
            {movie.rating}/10
          </span>
        </div>
      </div>

      {/* Movie Information */}
      <div className="space-y-7 p-6 md:p-8">
        <div>
          <h3 className="mb-3 text-xl font-bold text-white">
            Movie Overview
          </h3>

          <p className="leading-7 text-gray-400">
            {movie.description}
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Info label="Release Year" value={movie.year} />
          <Info label="Genre" value={movie.genre} />
          <Info label="Duration" value={movie.duration} />
          <Info label="Language" value={movie.language} />
        </div>

        {/* Director */}
        <div>
          <h3 className="mb-2 font-bold text-white">
            Director
          </h3>

          <p className="text-gray-400">{movie.director}</p>
        </div>

        {/* Cast */}
        <div>
          <h3 className="mb-3 font-bold text-white">
            Main Cast
          </h3>

          <div className="flex flex-wrap gap-2">
            {movie.cast.map((actor) => (
              <span
                key={actor}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300"
              >
                {actor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable information component
function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800 p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-2 font-bold text-white">{value}</p>
    </div>
  );
}

// Loading component for Suspense
function MovieLoading() {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-400" />

      <h3 className="mt-6 text-xl font-bold text-white">
        Loading Movie Details...
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        Fetching your movie information
      </p>
    </div>
  );
}

// Main App
export default function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(1);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  const genres = [
    "All",
    ...new Set(movies.map((movie) => movie.genre)),
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "All" || movie.genre === genre;

    return matchesSearch && matchesGenre;
  });

  const selectedMovie = movies.find(
    (movie) => movie.id === selectedMovieId
  );

  function handleSelectMovie(movieId) {
    setSelectedMovieId(movieId);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-slate-900/80 px-5 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight">
            <span className="text-cyan-400">CINE</span>
            <span className="text-white">VERSE</span>
            <span className="ml-2">🎬</span>
          </h1>

          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-300">
            MOVIE EXPLORER
          </span>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-10">
        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
            Discover your next movie
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            Smart Movie Explorer
          </h2>

          <p className="mt-3 text-gray-400">
            Explore movies, discover stories, and view movie details.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
          />

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900 px-5 py-4 text-white outline-none focus:border-cyan-400"
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Movie List */}
          <section className="lg:col-span-4">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-bold">
                Explore Movies
              </h3>

              <span className="text-sm text-gray-500">
                {filteredMovies.length} movies
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {filteredMovies.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie.id)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                    selectedMovieId === movie.id
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/10 bg-slate-900 hover:border-white/30"
                  }`}
                >
                  <div
                    className={`flex h-16 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${movie.color} text-3xl`}
                  >
                    {movie.emoji}
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold text-white">
                      {movie.title}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      {movie.year} · {movie.genre}
                    </p>

                    <p className="mt-1 text-xs text-yellow-400">
                      ★ {movie.rating}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <div className="rounded-xl border border-white/10 bg-slate-900 p-6 text-center text-gray-400">
                No movies found.
              </div>
            )}
          </section>

          {/* Movie Details */}
          <section className="lg:col-span-8">
            <div className="mb-5">
              <h3 className="text-xl font-bold">
                Movie Details
              </h3>
            </div>

            {selectedMovie ? (
              <Suspense
                key={selectedMovieId}
                fallback={<MovieLoading />}
              >
                <MovieDetails
                  moviePromise={getMoviePromise(selectedMovieId)}
                />
              </Suspense>
            ) : (
              <div className="rounded-2xl bg-slate-900 p-10 text-center text-gray-400">
                Select a movie to view its details.
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-white/10 px-5 py-6 text-center text-sm text-gray-500">
        Built with React 19 · use() Hook · Suspense · Tailwind CSS
      </footer>
    </div>
  );
}