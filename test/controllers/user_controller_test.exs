defmodule CloverCms.Admin.UserControllerTest do
  use CloverCms.ConnCase, async: true
  alias CloverCms.User
  alias CloverCms.UserType
  alias CloverCms.Repo
  alias CloverCms.Permission
  alias CloverCms.Role

  defp create_user do
    pr = Permission.changeset(%Permission{}, %{can: "MANAGE", on: "ALL"})
    newpr = Repo.insert!(pr)
    ut = UserType.changeset(%UserType{}, %{name: "admin"})
    newut = Repo.insert!(ut)
    role = Role.changeset(%Role{}, %{permission_id: newpr.id, user_type_id: newut.id, name: "admin"})
    Repo.insert!(role)
    us = User.changeset(%User{}, %{name: "admin",password: User.encrypt_pass("test") ,  email: "a@b.c", user_type_id: newut.id})
    Repo.insert!(us)
  end

  defp get_modules do
    Enum.map(Application.fetch_env!(:clover_cms, :modules), fn module -> %{"module"=> %{"name" => Atom.to_string(module)}} end)
  end
  
  test "index should return a json list of users" do
    conn = build_conn()
    us = create_user()
    expected = %{"data" => [%{"id" => us.id, "name"=> "admin", "email"=> "a@b.c", "type"=> "admin"}]}
    conn = get conn, admin_user_path(conn, :index) 

    assert  json_response(conn, 200) == expected
  end

  test "show should return a json representation of a user" do
    conn = build_conn()
    us = create_user()
    expected = %{"data" => %{"id" => us.id, "name"=>"admin", "email"=> "a@b.c", "user_type_id" => us.user_type_id}}
    conn = get conn, admin_user_path(conn, :show, us.id)

    assert json_response(conn, 200) == expected
  end

  test "show should return 404 if the user doesn't exist" do
    conn = build_conn()
    conn = get conn, admin_user_path(conn, :show, 1)
    assert conn.status == 404
  end

  test "authenticate with wrong credentials should be prompted with 401" do
    conn = build_conn()
    conn = post conn, "/api/admin/users/authenticate", %{"username" => "pippo", "password" => "pluto"}
    assert conn.status == 401
  end

  test "authenticate with right credentials shoulb be prompted with 200, name and permissions" do
    expected = %{"data" => %{"name" => "admin", "permissions" => [%{"can"=>"MANAGE", "on"=>"ALL"}], "modules" => get_modules()}}
    create_user()
    conn = build_conn()
           |> post("/api/admin/users/authenticate", %{"username" => "a@b.c", "password" => "test"})
    assert get_session(conn, :username) == "admin"
    assert get_session(conn, :permissions) == [%{"can"=>"MANAGE", "on"=>"ALL"}]
    assert json_response(conn, 200) == expected 
  end

  test "log out from an active session should work" do
    create_user()
    conn = build_conn()
           |> post("/api/admin/users/authenticate", %{"username" => "a@b.c", "password" => "test"})
    newconn = build_conn()
              |> get("/api/admin/users/logout")
    assert newconn.status == 200
    assert get_session(newconn, :username) == nil
    assert get_session(newconn, :permissions) == nil
  end
end
