require 'test_helper'

class PokemonEvolutionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pokemon_evolution = pokemon_evolutions(:one)
  end

  test "should get index" do
    get pokemon_evolutions_url, as: :json
    assert_response :success
  end

  test "should create pokemon_evolution" do
    assert_difference('PokemonEvolution.count') do
      post pokemon_evolutions_url, params: { pokemon_evolution: { pokemon_id: @pokemon_evolution.pokemon_id, pokemon_id_evolution: @pokemon_evolution.pokemon_id_evolution } }, as: :json
    end

    assert_response 201
  end

  test "should show pokemon_evolution" do
    get pokemon_evolution_url(@pokemon_evolution), as: :json
    assert_response :success
  end

  test "should update pokemon_evolution" do
    patch pokemon_evolution_url(@pokemon_evolution), params: { pokemon_evolution: { pokemon_id: @pokemon_evolution.pokemon_id, pokemon_id_evolution: @pokemon_evolution.pokemon_id_evolution } }, as: :json
    assert_response 200
  end

  test "should destroy pokemon_evolution" do
    assert_difference('PokemonEvolution.count', -1) do
      delete pokemon_evolution_url(@pokemon_evolution), as: :json
    end

    assert_response 204
  end
end
