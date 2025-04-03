class CreateCels < ActiveRecord::Migration[8.0]
  def change
    create_table :cels do |t|
      t.string :name
      t.string :url

      t.timestamps
    end
  end
end
