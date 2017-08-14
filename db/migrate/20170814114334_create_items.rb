# CreateItems
class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :name
      t.text :description
      t.references :category, index: true

      t.timestamps
    end
    add_foreign_key :items, :categories
  end
end
