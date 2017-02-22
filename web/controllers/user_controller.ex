defmodule CloverCms.Admin.UserController do
  use CloverCms.Web, :controller

  alias CloverCms.User
  
  def index(conn, _params) do
    users = User.list()
    render conn, users: users
  end
end
