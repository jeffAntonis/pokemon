Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace 'api' do
  	namespace 'v1' do
      resources :pokemons
      get '/getByName/:name' => 'pokemons#getByName'

      resources :pokemon_types
      get '/getTypes/:id' => 'pokemon_types#getTypes'
      get '/getTypesCombo/' => 'pokemon_types#getTypesCombo'
      post '/pokemon_types/alterTypes/:id' => 'pokemon_types#alterTypes'

      resources :pokemon_evolutions
      get '/getEvolutions/:id' => 'pokemon_evolutions#getEvolutions'
  	end
  end
end
