import React, { Component } from 'react';
import Like from './common/like';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { getMovies }  from '../services/fakeMovieService'; // getMovie is a named export in fakeMovieService
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate.js'; // to import client side paginate module 

class Movies extends Component {
    state = {  
        movies: [],
        geners: [],
        pageSize: 4,
        currentPage: 1
    };

    componentDidMount() {
        this.setState({ movies: getMovies(), geners: getGeners()});
    }

    handleGenreSelect = genre => {
        console.log(genre);
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
        // some conditional rendering
        const { length: count } = this.state.movies; // here using destructuring assigning length
                                                    // property of movies state to count constant
        const { currentPage, pageSize, movies: allMovies } = this.state;                                            
        if ( count === 0 ) return <p>There are no movies in the database!!!</p>
        const movies = paginate(allMovies, currentPage, pageSize);
        return ( 
            // inserting bootstrap table here to display movies in form of table
            <div className="row">
                <div className="col-2">
                    <ListGroup items= {this.state.geners} onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">
                <p>Showing { count } movies in the database</p>
                <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                    <tr key={movie._id}>
                        <td>{ movie.title }</td>
                        <td>{ movie.genre.name }</td> 
                        <td>{ movie.numberInStock }</td>
                        <td>{ movie.dailyRentalRate }</td>
                        <td>
                            <Like liked={movie.liked} onClick={() => this.handleLike(movie)}/>
                        </td>
                        <td>
                            <button onClick={() => this.handleDelete(movie)} 
                            className="btn btn-danger btn-sm">
                            Delete
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                itemsCount={count} 
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