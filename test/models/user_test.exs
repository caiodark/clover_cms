defmodule CloverCms.UserTest do
  use CloverCms.ModelCase, async: true

  alias CloverCms.User
  alias CloverCms.UserType
  alias CloverCms.Repo

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

  test "list returns a list of users" do
    type = UserType.changeset(%UserType{}, %{name: "admin"})
    case Repo.insert(type) do
      {:ok, new_type} ->
        user = User.changeset(%User{}, %{@valid_attrs | user_type_id: new_type.id})
        case Repo.insert(user) do
          {:ok, new_user} ->
            lista = User.list()
            elemento = hd(lista)
            assert length(lista) == 1 && elemento.id == new_user.id && elemento.user_type_id == new_user.user_type_id
          {:error, _user} ->
            assert "error while create user" == ""
        end
      {:error, _type} ->
        assert "error while creating user type" == ""
    end
  end
end
