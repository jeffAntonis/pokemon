class CreatePokemonEvolutions < ActiveRecord::Migration[5.0]
  def change
    create_table :pokemon_evolutions do |t|
      t.references :pokemon, foreign_key: true
      t.string :pokemon_name_evolution

      t.timestamps
    end
  end
end
