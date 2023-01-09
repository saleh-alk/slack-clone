class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :user, null: false, foreign_key: true
      t.references :channel, null: false, foreign_key: true
      t.text :description, null: false
      t.boolean :private, null: false
      t.timestamps
    end
  end
end
