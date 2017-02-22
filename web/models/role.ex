defmodule CloverCms.Role do
  use CloverCms.Web, :model

  schema "roles" do
    field :name, :string
    belongs_to :permission, CloverCms.Permission
    belongs_to :user_type,  CloverCms.UserType
    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :permission_id, :user_type_id])
    |> assoc_constraint(:permission)
    |> assoc_constraint(:user_type)
    |> validate_required([:name])
  end
end
