class AddPrivateChannel < ActiveRecord::Migration[7.0]
  def change
    add_column :channels, :private, :boolean, null: false
  end
end
