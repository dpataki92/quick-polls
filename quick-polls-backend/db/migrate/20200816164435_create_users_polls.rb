class CreateUsersPolls < ActiveRecord::Migration[6.0]
  def change
    create_table :users_polls do |t|
      t.integer :user_id
      t.integer :poll_id
    end
  end
end
