import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Categories.css';

const BodyPartsCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);
    console.log("id:", id); 

    // Function to fetch exercises
    const fetchData = useCallback(async () => {

        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${id}`,
            params: {
                limit: '20'
            },
            headers: {
                'x-rapidapi-key': 'df83c21514msh4e54a04f2a70f98p1bbdf2jsnba194ab0edc9',
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
            };

        try {
            console.log('options---', options)
            const response = await axios.request(options);
            console.log("API Response:", response.data); // Debugging: Check API response
            setExercises(response.data);
        } catch (error) {
            console.error("Error fetching exercises:", error);
            setError("Failed to fetch exercises. Please try again later.");
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    return (
        <div className="category-exercises-page">
            <h1>Category: <span>{id}</span></h1>

            {error ? (
                <p className="error-message">{error}</p> // Show error if API fails
            ) : exercises.length > 0 ? (
                <div className="exercises">
                    {exercises.map((exercise) => (
                        <div 
                            className="exercise-card" 
                            key={exercise.id} 
                            onClick={() => navigate(`/exercise/${exercise.id}`)}
                        >
                            <img src={exercise.gifUrl} alt={exercise.name} className="exercise-image" />
                            <h3>{exercise.name}</h3>
                            <p>Target: {exercise.target}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading exercises...</p>
            )}
        </div>
    );
};

export default BodyPartsCategory;
