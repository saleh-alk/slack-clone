class CreateWorkplaces < ActiveRecord::Migration[7.0]
  def change
    create_table :workplaces do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.references :admin, null: false, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
