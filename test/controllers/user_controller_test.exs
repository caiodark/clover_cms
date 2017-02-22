defmodule CloverCms.Admin.UserControllerTest do
  use CloverCms.ConnCase, async: true
  alias CloverCms.User
  alias CloverCms.UserType
  alias CloverCms.Repo

  defp create_user do
    ut = UserType.changeset(%UserType{}, %{name: "admin"})
    newut = Repo.insert!(ut)
    us = User.changeset(%User{}, %{name: "admin",password: "123",  email: "a@b.c", user_type_id: newut.id})
    Repo.insert!(us)
  end
  
  test "index should return a json list of users" do
    conn = build_conn()
    us = create_user()
    expected = %{"data" => [%{"id" => us.id, "name"=> "admin", "email"=> "a@b.c", "type"=> "admin"}]}
    conn = get conn, "/api/admin/users"

    assert  json_response(conn, 200) == expected
  end
end
