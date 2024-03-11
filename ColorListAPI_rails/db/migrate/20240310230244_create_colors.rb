class CreateColors < ActiveRecord::Migration[7.0]
  def change
    create_table :colors do |t|
      t.string :title
      t.string :uuid
      t.integer :color
      t.integer :rating

      t.timestamps
    end
  end
end
