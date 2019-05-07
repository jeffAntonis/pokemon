class CreatePokemonTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :pokemon_types do |t|
      t.string :ds_type
      t.references :pokemon, foreign_key: true

      t.timestamps
    end
  end
end
