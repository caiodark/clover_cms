defmodule CloverCms.User do
  use CloverCms.Web, :model
  alias CloverCms.Repo

  schema "users" do
    field :name, :string
    field :email, :string
    field :password, :string
    belongs_to :user_type, CloverCms.UserType 
    has_many :user_type_roles_permissions, through: [:user_type, :roles, :permission]
    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :email, :password, :user_type_id])
    |> assoc_constraint(:user_type)
    |> validate_required([:name, :email, :password])
  end

  def list() do
    CloverCms.User |> Repo.all |> Repo.preload([:user_type, :user_type_roles_permissions])
  end
end
