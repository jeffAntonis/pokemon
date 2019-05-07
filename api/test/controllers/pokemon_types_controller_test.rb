require 'test_helper'

class PokemonTypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pokemon_type = pokemon_types(:one)
  end

  test "should get index" do
    get pokemon_types_url, as: :json
    assert_response :success
  end

  test "should create pokemon_type" do
    assert_difference('PokemonType.count') do
      post pokemon_types_url, params: { pokemon_type: { ds_type: @pokemon_type.ds_type, pokemon_id: @pokemon_type.pokemon_id } }, as: :json
    end

    assert_response 201
  end

  test "should show pokemon_type" do
    get pokemon_type_url(@pokemon_type), as: :json
    assert_response :success
  end

  test "should update pokemon_type" do
    patch pokemon_type_url(@pokemon_type), params: { pokemon_type: { ds_type: @pokemon_type.ds_type, pokemon_id: @pokemon_type.pokemon_id } }, as: :json
    assert_response 200
  end

  test "should destroy pokemon_type" do
    assert_difference('PokemonType.count', -1) do
      delete pokemon_type_url(@pokemon_type), as: :json
    end

    assert_response 204
  end
end
