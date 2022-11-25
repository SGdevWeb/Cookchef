import styles from './Homepage.module.scss';
import Recipe from './components/Recipe/Recipe';
// import {data} from '../../data/recipes';
import { useState, useEffect, useContext } from 'react';
import Loading from '../../components/Loading/Loading';
import { ApiContext } from '../../context/ApiContext';

function Homepage() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const BASE_URL_API = useContext(ApiContext);

    useEffect(() => {
        let cancel = false;
        async function fetchRecipes() {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL_API}?skip=${ (page-1) * 9 }&limit=9`);
                if (response.ok && !cancel) {
                    const newRecipes = await response.json();
                    setRecipes(x => Array.isArray(newRecipes) ? [...x, ...newRecipes] : [newRecipes])
                }   
            } catch (e) {
                console.log('Erreur')
            } finally {
                setIsLoading(false);
            }
        }
        fetchRecipes();
        return () => (cancel = true);
    }, [BASE_URL_API, page]);

    function updateRecipe(updatedRecipe) {
        setRecipes(recipes.map((recipe) => recipe._id === updatedRecipe._id ? updatedRecipe : recipe))
    }

    function handleInput(e) {
        const filter = e.target.value;
        setFilter(filter.trim().toLowerCase());
    }

    return (
        <div className="flex-fill container d-flex flex-column p-20">
            <h1 className='my-30'>Découvrez nos nouvelles recettes</h1>
            <div className={`${styles.contentCard} card flex-fill d-flex flex-column p-20 mb-20`}>      
                <div className={`d-flex flex-row justify-content align-items my-30 ${ styles.searchBar }`}>
                    <i className="fa-solid fa-magnifying-glass mr-15"></i>
                    <input 
                        onInput={ handleInput } 
                        className='flex-fill' 
                        type="text" 
                        placeholder='Rechercher' />
                </div>
                {isLoading && !recipes.length ? (
                    <Loading />
                ) : (
                    <div className={styles.grid}>
                    {recipes
                        .filter( recipe => recipe.title.toLocaleLowerCase().startsWith(filter))
                        .map(recipe => (
                            <Recipe
                                key={recipe._id} 
                                recipe={recipe}
                                toggleLikedRecipe={updateRecipe}
                            />
                        ))}
                    </div>
                )}
                <div className='d-flex flex-row justify-content align-items p-20'>
                    <button onClick={() => setPage(page + 1)} className='btn btn-primary'>Charger plus de recettes</button>
                </div>
            </div>
        </div>
    );
}

export default Homepage;