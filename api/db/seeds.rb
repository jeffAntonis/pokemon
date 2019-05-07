# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'
require 'json'

PokemonType.delete_all
PokemonEvolution.delete_all
Pokemon.delete_all
cont = 0
reference_array = []

def save_evolution(objectEvolution)
    PokemonEvolution.create!(objectEvolution);
end

#PERCORRENDO OS POKEMONS
data = JSON.parse(open("https://pokeapi.co/api/v2/pokemon/?limit=151").string)
data['results'].each do |result|
    cont = cont + 1
    
    pokemon = JSON.parse(open(result["url"]).read)
    object = {
        "name":        result["name"],
        "url_photo":  pokemon["sprites"]["front_default"]
        # "url_photo":  result['url']
    }
    data = object

    pok = Pokemon.create!(data)
 
    #TIPOS
    pokemon['types'].each do |type|
        objectType = {
            "ds_type":        type["type"]["name"],
            "pokemon_id":  pok.id
        }
        PokemonType.create!(objectType);
    end

    #EVOLUÇÕES
    pokemon_species = JSON.parse(open("https://pokeapi.co/api/v2/pokemon-species/" + cont.to_s + "/").read)
    # evolution = JSON.parse(open("https://pokeapi.co/api/v2/evolution-chain/" + cont.to_s + "/").read)
    evolution = JSON.parse(open(pokemon_species["evolution_chain"]["url"]).read)
    if(evolution['chain']["evolves_to"].size > 0) 
        reference_array = evolution['chain']["evolves_to"]; 

        while(reference_array.size > 0) do
            objectEvolution = {
                "pokemon_name_evolution":  reference_array[0]["species"]["name"],
                "pokemon_id":  pok.id
            }

            save_evolution(objectEvolution);
            reference_array = reference_array[0]["evolves_to"];
        end        
    end

end