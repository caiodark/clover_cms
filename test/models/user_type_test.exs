defmodule CloverCms.UserTypeTest do
  use CloverCms.ModelCase

  alias CloverCms.UserType

  @valid_attrs %{name: "admin"}
  @invalid_attrs %{}

  test "changeset with valid attrs" do
    changeset = UserType.changeset(%UserType{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attrs" do
    changeset = UserType.changeset(%UserType{}, @invalid_attrs)
    refute changeset.valid?
  end
end
