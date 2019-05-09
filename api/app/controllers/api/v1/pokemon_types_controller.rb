module Api
  module V1
    class PokemonTypesController < ApplicationController
      before_action :set_pokemon_type, only: [:show, :update, :destroy]

      #get types
      def getTypes
        types = PokemonType.where('pokemon_id = ? ', params[:id])
				render json: {status: 'SUCCESS', message:'Tipos carregados', data:types},status: :ok
      end

      def getTypesCombo
        types = PokemonType.select('DISTINCT ds_type').order('ds_type ASC')
				render json: {status: 'SUCCESS', message:'Tipos carregados', data:types},status: :ok
      end

      # GET /pokemon_types
      def index
        @pokemon_types = PokemonType.all

        render json: @pokemon_types
      end

      # GET /pokemon_types/1
      def show
        render json: @pokemon_type
      end

      # POST /pokemon_types
      def create
        @pokemon_type = PokemonType.new(pokemon_type_params)

        if @pokemon_type.save
          render json: @pokemon_type, status: :created, location: @pokemon_type
        else
          render json: @pokemon_type.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /pokemon_types/1
      def update
        if @pokemon_type.update(pokemon_type_params)
          render json: @pokemon_type
        else
          render json: @pokemon_type.errors, status: :unprocessable_entity
        end
      end

      # DELETE /pokemon_types/1
      def destroy
        @pokemon_type.destroy
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_pokemon_type
          @pokemon_type = PokemonType.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def pokemon_type_params
          params.require(:pokemon_type).permit(:ds_type, :pokemon_id)
        end
    end
  end
end
