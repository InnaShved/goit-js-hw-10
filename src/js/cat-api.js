
export function fetchBreeds() {
    return fetch('https://api.thecatapi.com/v1/breeds?api_key=live_LE7LQl5ugcBdlFBqIlzhAfTa2ZZblix48xFhVb3qoUJjHWTkjCgaTaX0JZaZ2aDy').then(data => {
        if (!data.ok) {
            throw new Error(data.status)
        }
        return data.json();
    })
};

 export function fetchCatByBreed(breedId) {
    
     return fetch(`https://api.thecatapi.com/v1/images/search?has_breeds=1&breed_ids=${breedId}&api_key=live_LE7LQl5ugcBdlFBqIlzhAfTa2ZZblix48xFhVb3qoUJjHWTkjCgaTaX0JZaZ2aDy`)
      
         .then(data => {
             if (!data.ok) {
                 throw new Error(data.status)
             }
             return data.json();
         });
}; 