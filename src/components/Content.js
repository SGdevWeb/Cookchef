import styles from './Content.module.scss';
import Recipe from './Recipe';
import {data} from '../data/recipes';
import { useState } from 'react';

function Content() {
    const [filter, setFilter] = useState('');

    function handleInput(e) {
        const filter = e.target.value;
        setFilter(filter.trim().toLowerCase());
    }

    return <div className="flex-fill container p-20">
        <h1 className='my-30'>Découvrez nos nouvelles recettes</h1>
        <div className={`${styles.contentCard} card p-20`}>      
            <div className={`d-flex flex-row justify-content align-items my-30 ${ styles.searchBar }`}>
                <i className="fa-solid fa-magnifying-glass mr-15"></i>
                <input onInput={ handleInput } className='flex-fill' type="text" placeholder='Rechercher' />
            </div>
            <div className={styles.grid}>
                {data.filter( recipe => recipe.title.toLocaleLowerCase().startsWith(filter)).map(recipe =>
                    <Recipe
                        key={recipe._id} 
                        title={recipe.title} 
                        image={recipe.image}
                    />
                )}
            </div>
        </div>

    </div>
}

export default Content;