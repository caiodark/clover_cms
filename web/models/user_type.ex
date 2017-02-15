defmodule CloverCms.UserType do
  use CloverCms.Web, :model
  
  schema "user_types" do
    field :name, :string
    has_many :roles, CloverCms.Role
    has_many :roles_permissions, through: [:roles, :permission]
    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
