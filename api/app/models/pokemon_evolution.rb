class PokemonEvolution < ApplicationRecord
  has_and_belongs_to_many :pokemon
end
