defmodule CloverCms.Language do
  use CloverCms.Web, :model

  schema "languages" do
    field :url, :string
    field :name, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:url, :name])
    |> validate_required([:url, :name])
  end
end
