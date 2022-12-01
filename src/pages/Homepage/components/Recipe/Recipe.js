import { useContext } from "react";
import { ApiContext } from "../../../../context/ApiContext";
import styles from "./Recipe.module.scss";

function Recipe({ recipe: { _id, title, liked, image}, toggleLikedRecipe, deleteRecipe }) {

    const BASE_URL_API = useContext(ApiContext)

    async function handleClickLike() {
        try {   
            const response = await fetch(`${BASE_URL_API}/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    liked: !liked
                })
            });
            if (response.ok) {
                const updatedRecipe = await response.json();
                toggleLikedRecipe(updatedRecipe);
            }
        } catch (e) {
            console.log("ERREUR");
        }
    }

    async function handleClickDelete(e) {
        e.stopPropagation();
        try {
            const response = await fetch(`${BASE_URL_API}/${_id}`,{
                method: 'DELETE'
            });
            if (response.ok) {
                deleteRecipe(_id);
            }
        } catch (error) {
            console.log('Erreur')
        }
    }

    return (
        <div onClick={handleClickLike} className={styles.recipe}>
            <i onClick={handleClickDelete} className="fa-solid fa-xmark"></i>
            <div className={styles.imageContainer}>
                <img src={image} alt="recipe" />
            </div>
            <div className={`${styles.recipeTitle} d-flex flex-column justify-content align-items`}>
                <h3 className="mb-10">{title}</h3>
                <i className={`fa-solid fa-heart ${liked ? styles.heartColor : ""}`}></i>
            </div>
        </div>
    )
}

export default Recipe;