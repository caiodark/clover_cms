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
end
