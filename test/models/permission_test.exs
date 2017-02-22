defmodule CloverCms.PermissionTest do
  use CloverCms.ModelCase

  alias CloverCms.Permission

  @valid_attrs %{can: "MANAGE", on: "ALL"}
  @invalid_attrs %{}
  
  test "changeset with valid attrs" do
    changeset = Permission.changeset(%Permission{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attrs" do
    changeset = Permission.changeset(%Permission{}, @invalid_attrs)
    refute changeset.valid?
  end
end
