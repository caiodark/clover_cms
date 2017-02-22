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
    us = create_user()
    lista = User.list()
    elemento = hd(lista)

    assert length(lista) == 1
    assert elemento.id == us.id
    assert elemento.user_type_id == us.user_type_id
  end

  defp create_user() do
    utcs = UserType.changeset(%UserType{}, %{name: "admin"})
    ut = Repo.insert!(utcs)
    pass = @valid_attrs.password
    changeset = User.changeset(%User{}, %{@valid_attrs|user_type_id: ut.id, password: User.encrypt_pass(pass)})
    Repo.insert!(changeset)
  end

  test "by_id should return a user by its id" do
    us = create_user()
    assert User.by_id(us.id) == Repo.get!(User, us.id)
  end

  test "change password should change a user's password" do
    us = create_user()
    User.change_password("test", "nuova", "nuova", us.id)
    assert User.by_id(us.id).password == User.encrypt_pass("nuova")
  end

  test "user should authenticate with the right username and password" do
    us = create_user()
    username = "cbrogliato@gmail.com"
    password = "test"
    assert User.authenticate(username, password) == true
  end

  test "user should be searched by email" do
    us = create_user()
    assert User.by_email(us.email) == us
  end
end
