import React, { Component } from 'react';
import { getMovies }  from '../services/fakeMovieService'; // getMovie is a named export in fakeMovieService

class Movies extends Component {
    state = {  
        movies: getMovies() // movies property is set to function here just for sake of understanding
    };
    render() { 
        return ( 
            // inserting bootstrap table here to display movies in form of table
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.movies.map(movie =>
                       <tr key={movie._id}>
                           <td>{ movie.title }</td>
                           <td>{ movie.genre.name }</td> 
                           <td>{ movie.numberInStock }</td>
                           <td>{ movie.dailyRentalRate }</td>
                           <td><button>Delete</button></td>
                       </tr> )}
                </tbody>
            </table>

         );
    }
}
 
export default Movies;