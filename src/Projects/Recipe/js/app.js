import { fetchRecipes } from "./fetchRecipe";

class Render {
	constructor(_targetID) {
		this.targetID = _targetID;
		this.target = this.getTargetElement();
	}

	getTargetElement() {
		return document.getElementById(this.targetID);
	}

	injectContent(content) {
		this.target.innerHTML += content;
	}
}

const getRecipeCard = ({ recipeTitle, recipeImg, recipeDescription, recipeURL }) => {
	return `
		<div class="col">
			<div class="card">
				<img
					src="${recipeImg}" width="90" height="200"
					class="card-img-top"
				/>
				<div class="card-body">
					<h5 class="card-title">
						${recipeTitle}
					</h5>
					<p class="card-text">
						${recipeDescription}
					</p>
					<a target="_blank" href="${recipeURL}" class="btn btn-primary">Go somewhere</a>
				</div>
			</div>
		</div>
	`;
};

const renderRecipes = async () => {
	const recipes = await fetchRecipes();

	const recipeCards = recipes.map((recipe) => {
		return getRecipeCard({
			recipeTitle: recipe.post_title,
			recipeImg: recipe.post_img_url_src,
			recipeDescription: recipe.post_description,
			recipeURL: recipe.post_url
		});
	});

	const renderer = new Render("recipeContainer");
	renderer.injectContent(recipeCards.join(" "));
};

renderRecipes();
