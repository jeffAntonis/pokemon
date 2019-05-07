class Pokemon < ApplicationRecord
    has_many :pokemon_type
    has_and_belongs_to_many :pokemon_evolution
    validates :name, presence: true
    validates :url_photo, presence: true
end
