import React, { Component } from 'react';
import Like from './common/like';
import { getMovies }  from '../services/fakeMovieService'; // getMovie is a named export in fakeMovieService

class Movies extends Component {
    state = {  
        movies: getMovies() // movies property is set to function here just for sake of understanding
    };

    handleLike = movie => {
        //console.log('Like clicked', movie);
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies});
    }

    // event hNDLER FOR ONCLICK arrow function used so no constructor or bining required here
    handleDelete = (movie) => {
        const movies = this.state.movies.filter( m => m._id !== movie._id);
        this.setState({ movies });
    }

    render() { 
        // some conditional rendering
        const { length: count } = this.state.movies; // here using destructuring assigning length
                                                    // property of movies state to count constant
        if ( count === 0 )
            return <p>There are no movies in the database!!!</p>
        return ( 
            // inserting bootstrap table here to display movies in form of table
            <React.Fragment>
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
                    {this.state.movies.map(movie => (
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
        </React.Fragment>
        );
}
}
 
export default Movies;