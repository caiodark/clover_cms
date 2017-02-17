defmodule CloverCms.RoleTest do
  use CloverCms.ModelCase

  alias CloverCms.Role

  @valid_attrs %{name: "admin", permission_id: 1, user_type_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attrs" do
    changeset = Role.changeset(%Role{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attrs" do
    changeset = Role.changeset(%Role{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "name is mandatory" do
    changeset = Role.changeset(%Role{}, Map.delete(@valid_attrs, :name))
    refute changeset.valid?
  end
end
