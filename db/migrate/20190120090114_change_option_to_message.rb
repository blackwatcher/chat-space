class ChangeOptionToMessage < ActiveRecord::Migration[5.0]
  def change
  	change_column :messages, :content, :string, null: true, default: nil
  end
end
