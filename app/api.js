const base_api = "https://pokeapi.co/api/v2/";

class api {
    async getRegion(){
      
        const query = await fetch(`${base_api}location`,{
          method:'GET'
        })
        .then(function(response){
          if (response.ok) {
            return response.json()
          } else{
            console.log("error");
            throw "Error"
          }
        })
        .then(function(texto){
          return texto
        })
        .catch(function(err){
          console.log("error",err);
          return err
        })
        console.log(query.results)
        return query.results
      }
}

export default new api();
