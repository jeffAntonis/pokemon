module Api
  module V1
    class PokemonEvolutionsController < ApplicationController
      before_action :set_pokemon_evolution, only: [:show, :update, :destroy]

      # GET /pokemon_evolutions
      def index
        @pokemon_evolutions = PokemonEvolution.all

        render json: @pokemon_evolutions
      end

      def getEvolutions
        evolutions = PokemonEvolution.where('pokemon_id = ? ', params[:id])
        result = [];
        evolutions.each do |evolution|
          pokemons = Pokemon.where('name LIKE ? ', "%#{evolution["pokemon_name_evolution"]}%",)
          result.push(pokemons);
        end
				render json: {status: 'SUCCESS', message:'Evoluções carregadas', data:result},status: :ok
      end

      def getEvolutionsCombo
        evolutions = PokemonEvolution.select('DISTINCT pokemon_name_evolution').order('pokemon_name_evolution ASC')
				render json: {status: 'SUCCESS', message:'Evoluções carregadas', data:evolutions},status: :ok
      end

      # GET /pokemon_evolutions/1
      def show
        render json: @pokemon_evolution
      end

      # POST /pokemon_evolutions
      def create
        @pokemon_evolution = PokemonEvolution.new(pokemon_evolution_params)

        if @pokemon_evolution.save
          render json: @pokemon_evolution, status: :created, location: @pokemon_evolution
        else
          render json: @pokemon_evolution.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /pokemon_evolutions/1
      def update
        if @pokemon_evolution.update(pokemon_evolution_params)
          render json: @pokemon_evolution
        else
          render json: @pokemon_evolution.errors, status: :unprocessable_entity
        end
      end

      def alterEvolutions
        PokemonEvolution.where('pokemon_id = ? ', params[:id]).delete_all
        params[:evolutions].each do |evolution|

          p '##########################'
          p evolution
          p evolution.size
          p evolution[0] 
          p '##########################'

          name = "";
          if(evolution[0] == nil)
            name = evolution["0"]["name"]            
          elsif
            name = evolution[0]["name"]
          end

          objectEvolution = {
            "pokemon_name_evolution":        name,
            "pokemon_id":  params[:id]
          }
          PokemonEvolution.create!(objectEvolution);
        end
      end

      # DELETE /pokemon_evolutions/1
      def destroy
        @pokemon_evolution.destroy
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_pokemon_evolution
          @pokemon_evolution = PokemonEvolution.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def pokemon_evolution_params
          params.require(:pokemon_evolution).permit(:pokemon_id, :pokemon_name_evolution)
        end
    end
  end
end
