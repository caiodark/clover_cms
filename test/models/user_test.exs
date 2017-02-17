defmodule CloverCms.UserTest do
  use CloverCms.ModelCase

  alias CloverCms.User

  @valid_attrs %{name: "admin", email: "cbrogliato@gmail.com", password: "test", user_type_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attrs" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attrs" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "name is mandatory" do
    changeset = User.changeset(%User{}, Map.delete(@valid_attrs, :name))
    refute changeset.valid?
  end

  test "email is mandatory" do
    changeset = User.changeset(%User{}, Map.delete(@valid_attrs, :email))
    refute changeset.valid?
  end

  test "password is mandatory" do
    changeset = User.changeset(%User{}, Map.delete(@valid_attrs, :password))
    refute changeset.valid?
  end
end
