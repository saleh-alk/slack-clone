class AddWorkplaceIdToChannel < ActiveRecord::Migration[7.0]
  def change
    add_reference :channels, :workplace, null: false, foreign_key: true
  end
end
