class FixColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :messages, :description, :body
  end
end
