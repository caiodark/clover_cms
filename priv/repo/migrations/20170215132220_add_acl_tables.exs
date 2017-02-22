defmodule CloverCms.Repo.Migrations.AddAclTables do
  use Ecto.Migration

  def change do
    create table(:user_types) do
      add :name, :string
      timestamps()
    end

    create table(:permissions) do
      add :can, :string
      add :on,  :string
      timestamps()
    end

    create table(:roles) do
      add :name, :string
      add :user_type_id, references(:user_types, on_delete: :nothing)
      add :permission_id, references(:permissions, on_delete: :nothing)
      timestamps()
    end

    create table(:users) do
      add :name, :string
      add :email, :string
      add :password, :string
      add :user_type_id, references(:user_types, on_delete: :nothing)
      timestamps()
    end
  end
end
