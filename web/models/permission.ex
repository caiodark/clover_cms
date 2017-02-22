defmodule CloverCms.Permission do
  use CloverCms.Web, :model
  
  schema "permissions" do
    field :can, :string
    field :on,  :string
    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:can, :on])
    |> validate_required([:can, :on])
  end
end
