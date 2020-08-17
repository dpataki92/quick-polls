class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes do |t|
      t.integer :option_id
      t.integer :user_id
    end
  end
end
