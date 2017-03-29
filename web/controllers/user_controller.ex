require IEx
defmodule CloverCms.Admin.UserController do
  use CloverCms.Web, :controller

  alias CloverCms.User
  
  def index(conn, _params) do
    users = User.list()
    render conn, users: users
  end

  def show(conn, %{"id" => id}) do
    try do
      user = User.by_id(id)
      render conn, user: user
    rescue
      _ ->
        conn
        |> send_resp(404, "")
    end
  end

  def authenticate(conn, %{"username" => username, "password" => password}) do
    if User.authenticate(username, password) do
      user = User.by_email(username) |> Repo.preload([:user_type_roles_permissions])
      permissions = Enum.map(user.user_type_roles_permissions, fn (perm) ->
        %{"can"=> perm.can, "on" => perm.on}
      end)
      conn
      |> put_session(:username, user.name)
      |> put_session(:email, user.email)
      |> put_session(:permissions, permissions)
      |> render(name: user.name, permissions: permissions)
    else
      conn
      |> send_resp(401, "")
    end
  end

  #@doc
  #return the current session data
  def session(conn, _params) do
    try do
      user = User.by_email(get_session(conn, :email)) |> Repo.preload([:user_type_roles_permissions])
      permissions = Enum.map(user.user_type_roles_permissions, fn (perm) ->
        %{"can"=> perm.can, "on" => perm.on}
      end)
      conn
      |> render(name: user.name, permissions: permissions)
    rescue
      _error ->
        conn
        |> send_resp(401, "")
    end
  end

  def logout(conn, _params) do
    conn
    |> configure_session(drop: true)
    |> send_resp(200, "")
  end
end
