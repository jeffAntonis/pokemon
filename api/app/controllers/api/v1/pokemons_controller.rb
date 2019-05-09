module Api
	module V1
        class PokemonsController < ApplicationController   
            # Listar todos os pokemons
			def index
				pokemons = Pokemon.order('created_at ASC');
				render json: {status: 'SUCCESS', message:'Pokemons carregados', data: pokemons}, status: :ok
			end

			def getByName
				pokemons = Pokemon.where('name LIKE ? ', "%#{params[:name]}%",)
				render json: {status: 'SUCCESS', message:'Pokemons carregados', data:pokemons},status: :ok
			end
			
			# Listar pokemon passando ID
			def show
				pokemon = Pokemon.find(params[:id])
				render json: {status: 'SUCCESS', message:'Pokemon carregado', data:pokemon},status: :ok
			end

			# Criar um novo pokemon
			def create
				pokemon = Pokemon.new(pokemon_params)
				if pokemon.save
					render json: {status: 'SUCCESS', message:'Pokemon Criado', data:pokemon},status: :ok
				else
					render json: {status: 'ERROR', message:'Pokemon não foi Criado', data:pokemon.erros},status: :unprocessable_entity
				end
			end

			# PATCH/PUT /pokemons/1
			def update
				pokemon = Pokemon.where('id = ? ', params[:id]).update(pokemon_params)
				render json: pokemon
			end

			def destroy
				PokemonType.where('pokemon_id = ? ', params[:id]).delete_all
				PokemonEvolution.where('pokemon_id = ? ', params[:id]).delete_all
				Pokemon.where('id = ? ', params[:id]).delete_all
			end

			# Criar um novo pokemon
			def teste
				render json: {status: 'SUCCESS', message:'Pokemon Criado', data: {}},status: :ok
			end

			def pokemon_params
				params.require(:pokemon).permit(:name, :url_photo)
			end
		end
	end
end