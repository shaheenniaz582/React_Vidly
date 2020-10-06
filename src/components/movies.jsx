import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { getMovies }  from '../services/fakeMovieService'; // getMovie is a named export in fakeMovieService
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate.js'; // to import client side paginate module 
import _ from 'lodash';

class Movies extends Component {
    state = {  
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
    };

    componentDidMount() {
        const genres = [ { _id: '', name: "All Genres"}, ...getGenres()];
        
        this.setState({ movies: getMovies(), genres});
    }

    handleSort = sortColumn => {
       this.setState({ sortColumn });
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    }

    handleLike = movie => {
        //console.log('Like clicked', movie);
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies});
    }

    // event hNDLER FOR ONCLICK arrow function used so no constructor or bining required here
    handleDelete = movie => {
        const movies = this.state.movies.filter( m => m._id !== movie._id);
        this.setState({ movies });
    }

    handlePageChange = page => {
        //console.log(page);
        this.setState({ currentPage: page });
    }

    render() { 
        
        // object Destructuring
        const { length: count } = this.state.movies; // here using destructuring assigning length
                                                    // property of movies state to count constant
        const {                                 
            currentPage, 
            sortColumn,
            pageSize, 
            selectedGenre, 
            movies: allMovies 
        } = this.state;     

        // some conditional rendering

        if ( count === 0 ) return <p>There are no movies in the database!!!</p>

        const filtered = selectedGenre && selectedGenre._id
         ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
         : allMovies;

          const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        console.log(filtered);
        const movies = paginate(sorted, currentPage, pageSize);
        return ( 
            // inserting bootstrap table here to display movies in form of table
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                        items= {this.state.genres} 
                        selectedItem={this.state.selectedGenre}
                        /* Deleting them after adding default props to component"
                        textProperty="name"
                        valueProperty="_id" */
                        onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">
                <p>Showing { filtered.length } movies in the database</p>
            <MoviesTable 
                movies={movies} 
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort = {this.handleSort}
            />    
            <Pagination 
                itemsCount={filtered.length} 
                pageSize={pageSize} 
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
            />
                </div>
                
        </div>
        );
}
}
 
export default Movies;