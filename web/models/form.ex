defmodule CloverCms.Form do
  use CloverCms.Web, :model

  schema "forms" do
    field :name, :string
    field :defMessage, :string, default: ""

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :defMessage])
    |> validate_required([:name])
  end
end
