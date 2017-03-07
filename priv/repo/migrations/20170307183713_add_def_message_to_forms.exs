defmodule CloverCms.Repo.Migrations.AddDefMessageToForms do
  use Ecto.Migration

  def change do
    alter table(:forms) do
      add :defMessage, :text, default: ""
    end
  end
end
