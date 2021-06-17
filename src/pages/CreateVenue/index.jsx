import React from 'react';


const handleSubmit = (e) => {
    e.preventDefault();
      const data = new FormData(e.target);
  
      fetch(`http://localhost:3001/api/venues`, { //a ne pas oublier de changer l'url par une variable !
        method: "post",
        body: data
      })      // pas de content type pour gérer multiple type de fichier
        .then(response => {
          if(response.ok){
            console.log('Ok ça marche bro !');
          }else (alert('Erreur !'));
        })
        .catch(error => console.log('error', error));
}

  function CreateVenue() {
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Images</label>
          <input name="images[]" type="file" multiple={true} />  
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
  
  export default CreateVenue;